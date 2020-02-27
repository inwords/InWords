package ru.inwords.inwords.game.presentation.game_levels

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.navArgs
import androidx.recyclerview.widget.GridLayoutManager
import com.facebook.imagepipeline.request.ImageRequestBuilder
import ru.inwords.inwords.R
import ru.inwords.inwords.core.recycler.fixOverscrollBehaviour
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.data.INVALID_ID
import ru.inwords.inwords.databinding.FragmentGameLevelsBinding
import ru.inwords.inwords.game.data.bean.GameLevelInfo
import ru.inwords.inwords.game.presentation.BaseContentFragment
import ru.inwords.inwords.game.presentation.OctoGameViewModelFactory
import ru.inwords.inwords.game.presentation.game_levels.recycler.GameLevelsAdapter
import ru.inwords.inwords.game.presentation.game_levels.recycler.applyDiffUtil

class GameLevelsFragment : BaseContentFragment<GameLevelInfo, GameLevelsViewModel, OctoGameViewModelFactory, FragmentGameLevelsBinding>() {
    override val layout = R.layout.fragment_game_levels
    override val classType = GameLevelsViewModel::class.java

    override fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): FragmentGameLevelsBinding {
        return FragmentGameLevelsBinding.inflate(inflater, container, attachToRoot)
    }

    override val noContentViewId = R.id.levels_recycler

    private val args by navArgs<GameLevelsFragmentArgs>()

    private var gameId: Int = INVALID_ID
    private lateinit var adapter: GameLevelsAdapter

    private var shownIntro = false

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        return super.onCreateView(inflater, container, savedInstanceState).apply {
            adapter = GameLevelsAdapter { viewModel.navigateToGameLevel(it, gameId) }

            binding.levelsRecycler.layoutManager = GridLayoutManager(context, 3)
            binding.levelsRecycler.adapter = adapter

            if (!shownIntro) {
                showIntro(this)
                shownIntro = true
            }
        }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupWithNavController(binding.toolbar)

        viewModel.screenInfoStream(args.gameInfo.gameId)
            .map {
                if (it is Resource.Success) {
                    gameId = it.data.game.gameId
                    it.data.game.gameLevelInfos
                } else {
                    showNoContent()
                    emptyList() //TODO show error LUL
                }
            }
            .applyDiffUtil()
            .observeOn(SchedulersFacade.ui())
            .doOnSubscribe { binding.levelsRecycler.showShimmerAdapter() }
            .doOnEach { binding.levelsRecycler.hideShimmerAdapter() }
            .subscribe({
                showScreenState(it.first)
                adapter.accept(it)

                fixOverscrollBehaviour(binding.levelsRecycler)
            }) {
                Log.e(javaClass.simpleName, it.message.orEmpty())
                showNoContent()
            }
            .disposeOnViewDestroyed()
    }

    private fun showIntro(view: View) = with(view) {
        val imageRequest = ImageRequestBuilder
            .newBuilderWithResourceId(R.drawable.octopus_default)
            .build()

        with(binding.welcomeScreen) {
            welcomeImage.setImageRequest(imageRequest)
            welcomeText.text = args.gameInfo.description
            root.visibility = View.VISIBLE

            startButton.setOnClickListener {
                root.animate()
                    .alpha(0f)
                    .withEndAction { root.visibility = View.GONE }
            }
        }
    }
}
