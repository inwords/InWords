package ru.inwords.inwords.game.presentation.game_level

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.ViewTreeObserver.OnGlobalLayoutListener
import android.widget.Toast
import androidx.core.view.isVisible
import androidx.navigation.fragment.navArgs
import ru.inwords.inwords.R
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.utils.observe
import ru.inwords.inwords.databinding.FragmentGameLevelBinding
import ru.inwords.inwords.game.data.bean.GameLevelInfo
import ru.inwords.inwords.game.presentation.OctoGameViewModelFactory
import ru.inwords.inwords.presentation.GAME_LEVEL_INFO
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.texttospeech.TtsMediaPlayerAdapter
import java.lang.ref.WeakReference


class GameLevelFragment : FragmentWithViewModelAndNav<GameLevelViewModel, OctoGameViewModelFactory, FragmentGameLevelBinding>() {
    override val layout = R.layout.fragment_game_level
    override val classType = GameLevelViewModel::class.java

    override fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): FragmentGameLevelBinding {
        return FragmentGameLevelBinding.inflate(inflater, container, attachToRoot)
    }

    private val args by navArgs<GameLevelFragmentArgs>()

    private lateinit var ttsMediaPlayerAdapter: TtsMediaPlayerAdapter

    private lateinit var gameLevelInfo: GameLevelInfo

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        gameLevelInfo = savedInstanceState?.getParcelable(GAME_LEVEL_INFO) ?: args.gameLevelInfo
    }

    override fun onSaveInstanceState(outState: Bundle) {
        viewModel.getCurrentLevelInfo()?.let { outState.putParcelable(GAME_LEVEL_INFO, it) }
        super.onSaveInstanceState(outState)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupWithNavController(binding.toolbar)

        observe(viewModel.showProgress) {
            it.contentIfNotHandled?.let {
                binding.progressView.post {
                    binding.progressView.isVisible = it
                    binding.progressView.progress = if (it) 50 else 0
                }
            }
        }

        binding.table.viewTreeObserver.addOnGlobalLayoutListener(object : OnGlobalLayoutListener {
            override fun onGlobalLayout() {
                binding.table.viewTreeObserver.removeOnGlobalLayoutListener(this)

                viewModel.onAttachGameScene(GameScene(WeakReference(binding.table)))

                viewModel.onGameLevelSelected(args.gameId, gameLevelInfo)
            }
        })

        ttsMediaPlayerAdapter = TtsMediaPlayerAdapter { resource ->
            if (resource !is Resource.Success) {
                Toast.makeText(context, getString(R.string.unable_to_load_voice), Toast.LENGTH_SHORT).show()
            }
        }

        ttsMediaPlayerAdapter
            .observeTtsStream(viewModel.ttsStream)
            .disposeOnViewDestroyed()
    }
}