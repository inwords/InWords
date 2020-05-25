package ru.inwords.inwords.game.presentation.game_level

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.ViewTreeObserver.OnGlobalLayoutListener
import android.widget.Toast
import androidx.core.view.isVisible
import androidx.fragment.app.FragmentResultListener
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.navArgs
import ru.inwords.inwords.R
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.utils.observe
import ru.inwords.inwords.databinding.FragmentGameLevelBinding
import ru.inwords.inwords.game.domain.model.GameLevelInfo
import ru.inwords.inwords.game.presentation.WordsSetsViewModelFactory
import ru.inwords.inwords.game.presentation.game_level.ClickedButton.*
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.texttospeech.TtsMediaPlayerAdapter
import java.lang.ref.WeakReference

class GameLevelFragment : FragmentWithViewModelAndNav<GameLevelViewModel, WordsSetsViewModelFactory, FragmentGameLevelBinding>() {
    override val layout = R.layout.fragment_game_level
    override val classType = GameLevelViewModel::class.java

    override fun provideViewModel() = viewModelWorkaround

    override fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): FragmentGameLevelBinding {
        return FragmentGameLevelBinding.inflate(inflater, container, attachToRoot)
    }

    private val viewModelWorkaround: GameLevelViewModel by viewModels { modelFactory }

    private val args by navArgs<GameLevelFragmentArgs>()

    private var gameId: Int = 0
    private lateinit var gameLevelInfo: GameLevelInfo

    override fun onAttach(context: Context) {
        super.onAttach(context)
        viewModel.setTrainingState(args.trainingState)
        viewModel.setListeningMetric(args.listeningMetric)

        parentFragmentManager.setFragmentResultListener(
            GAME_END_RESULT_KEY,
            this,
            FragmentResultListener { _: String, result: Bundle ->
                when (result.getSerializable(CLICKED_BUTTON_KEY) as ClickedButton) {
                    BUTTON_HOME -> Unit
                    BUTTON_BACK -> Unit
                    BUTTON_NEXT -> viewModel.onNextButtonClicked()
                    BUTTON_RETRY -> viewModel.onRetryButtonCLicked()
                }
            })
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        gameId = savedInstanceState?.getInt(GAME_ID, args.gameId) ?: args.gameId
        gameLevelInfo = savedInstanceState?.getParcelable(GAME_LEVEL_INFO) ?: args.gameLevelInfo
    }

    override fun onSaveInstanceState(outState: Bundle) {
        viewModel.getCurrentGameId()?.let { outState.putInt(GAME_ID, it) }
        viewModel.getCurrentLevelInfo()?.let { outState.putParcelable(GAME_LEVEL_INFO, it) }
        super.onSaveInstanceState(outState)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupWithNavController(binding.toolbar)

        observe(viewModel.progress) {
            binding.progressView.isVisible = it
            binding.progressView.progress = if (it) 50 else 0
        }

        binding.table.viewTreeObserver.addOnGlobalLayoutListener(object : OnGlobalLayoutListener {
            override fun onGlobalLayout() {
                binding.table.viewTreeObserver.removeOnGlobalLayoutListener(this)

                viewModel.onAttachGameScene(GameScene(WeakReference(binding.table)))

                viewModel.onGameLevelSelected(gameId, gameLevelInfo)
            }
        })

        val ttsMediaPlayerAdapter = TtsMediaPlayerAdapter { resource ->
            if (resource !is Resource.Success) {
                Toast.makeText(context, getString(R.string.unable_to_load_voice), Toast.LENGTH_SHORT).show()
            }
        }

        ttsMediaPlayerAdapter
            .observeTtsStream(viewModel.ttsStream)
            .disposeOnViewDestroyed()
    }

    companion object {
        private const val GAME_LEVEL_INFO = "GAME_LEVEL_INFO"
        private const val GAME_ID = "GAME_ID"
    }
}