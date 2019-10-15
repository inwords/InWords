package ru.inwords.inwords.presentation.viewScenario.octoGame.gameLevels

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.navigation.fragment.navArgs
import androidx.recyclerview.widget.GridLayoutManager
import com.facebook.imagepipeline.request.ImageRequestBuilder
import kotlinx.android.synthetic.main.fragment_game_levels.*
import kotlinx.android.synthetic.main.game_welcome.*
import ru.inwords.inwords.R
import ru.inwords.inwords.core.fixOverscrollBehaviour
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.game.Game
import ru.inwords.inwords.data.dto.game.GameInfo
import ru.inwords.inwords.data.dto.game.GameLevelInfo
import ru.inwords.inwords.domain.model.Resource
import ru.inwords.inwords.presentation.viewScenario.octoGame.BaseContentFragment
import ru.inwords.inwords.presentation.viewScenario.octoGame.OctoGameViewModelFactory
import ru.inwords.inwords.presentation.viewScenario.octoGame.gameLevels.recycler.GameLevelsAdapter
import ru.inwords.inwords.presentation.viewScenario.octoGame.gameLevels.recycler.applyDiffUtil

class GameLevelsFragment : BaseContentFragment<GameLevelInfo, GameLevelsViewModel, OctoGameViewModelFactory>() {
    override val layout = R.layout.fragment_game_levels
    override val classType = GameLevelsViewModel::class.java

    private val args by navArgs<GameLevelsFragmentArgs>()

    private lateinit var gameInfo: GameInfo
    private lateinit var game: Game
    private lateinit var adapter: GameLevelsAdapter

    private var shownIntro = false

    override fun onAttach(context: Context) {
        super.onAttach(context)

        gameInfo = args.gameInfo
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        if (!shownIntro) {
            showIntro()
            shownIntro = true
        }

        adapter = GameLevelsAdapter(layoutInflater, viewModel.navigateToGameLevel)

        levelsRecycler.layoutManager = GridLayoutManager(context, 3)
        levelsRecycler.adapter = adapter

        viewModel.navigateToGameLevel.subscribe(::navigateToGameLevel).disposeOnViewDestroyed()

        viewModel.screenInfoStream(gameInfo.gameId)
                .map {
                    if (it.gameResource is Resource.Success) {
                        game = it.gameResource.data
                        game.gameLevelInfos
                    } else {
                        emptyList()
                    }
                }
                .applyDiffUtil()
                .observeOn(SchedulersFacade.ui())
                .doOnSubscribe { levelsRecycler.showShimmerAdapter() }
                .doOnEach { levelsRecycler.hideShimmerAdapter() }
                .subscribe({
                    showScreenState(it.first)
                    adapter.accept(it)

                    fixOverscrollBehaviour(levelsRecycler)
                }) {
                    Log.e(javaClass.simpleName, it.message.orEmpty())
                    showNoContent()
                }
                .disposeOnViewDestroyed()
    }

    private fun navigateToGameLevel(gameLevelInfo: GameLevelInfo) {
        navController.navigate(GameLevelsFragmentDirections.actionGameLevelsFragmentToGameLevelFragment(gameLevelInfo, game.gameId))
    }

    private fun showIntro() {
        val imageRequest = ImageRequestBuilder
                .newBuilderWithResourceId(R.drawable.octopus_default)
                .build()

        welcome_image.setImageRequest(imageRequest)
        welcome_text.text = gameInfo.description
        welcome_screen.visibility = View.VISIBLE

        startButton.setOnClickListener {
            welcome_screen.animate()
                    .alpha(0f)
                    .withEndAction { welcome_screen?.visibility = View.GONE }
        }
    }
}
