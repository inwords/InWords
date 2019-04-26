package ru.inwords.inwords.presentation.viewScenario.octoGame.gameLevels

import android.content.Context
import android.os.Bundle
import android.view.View
import androidx.recyclerview.widget.GridLayoutManager
import com.facebook.imagepipeline.request.ImageRequestBuilder
import kotlinx.android.synthetic.main.fragment_game_levels.*
import kotlinx.android.synthetic.main.game_welcome.*
import ru.inwords.inwords.R
import ru.inwords.inwords.core.RxDiffUtil
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.game.Game
import ru.inwords.inwords.data.dto.game.GameInfo
import ru.inwords.inwords.data.dto.game.GameLevelInfo
import ru.inwords.inwords.domain.GAME_ID
import ru.inwords.inwords.domain.GAME_INFO
import ru.inwords.inwords.domain.GAME_LEVEL_INFO
import ru.inwords.inwords.presentation.viewScenario.octoGame.BaseContentFragment
import ru.inwords.inwords.presentation.viewScenario.octoGame.OctoGameViewModelFactory
import ru.inwords.inwords.presentation.viewScenario.octoGame.gameLevels.recycler.GameLevelsAdapter
import ru.inwords.inwords.presentation.viewScenario.octoGame.gameLevels.recycler.GameLevelsDiffUtilCallback

class GameLevelsFragment : BaseContentFragment<GameLevelInfo, GameLevelsViewModel, OctoGameViewModelFactory>() {
    private lateinit var gameInfo: GameInfo
    private lateinit var game: Game
    private lateinit var adapter: GameLevelsAdapter

    private var shownIntro = false

    override fun onAttach(context: Context?) {
        super.onAttach(context)

        gameInfo = arguments?.getSerializable(GAME_INFO) as GameInfo
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

        compositeDisposable.add(viewModel.navigateToGameLevel.subscribe(::navigateToGameLevel))

        compositeDisposable.add(viewModel.screenInfoStream(gameInfo.gameId)
                .map {
                    if (it.gameResource.success()) {
                        game = it.gameResource.data!!
                        game.gameLevelInfos
                    } else {
                        emptyList()
                    }
                }
                .compose(RxDiffUtil.calculate(GameLevelsDiffUtilCallback.Companion::create))
                .observeOn(SchedulersFacade.ui())
                .subscribe({
                    showScreenState(it.first)
                    adapter.accept(it)
                }) {
                    it.printStackTrace()
                    showNoContent()
                })
    }

    private fun navigateToGameLevel(gameLevelInfo: GameLevelInfo) {
        val bundle = Bundle()
        bundle.putSerializable(GAME_LEVEL_INFO, gameLevelInfo)
        bundle.putInt(GAME_ID, game.gameId)
        navController.navigate(R.id.action_gameLevelsFragment_to_gameLevelFragment, bundle)
    }

    private fun showIntro() {
        val imageRequest = ImageRequestBuilder
                .newBuilderWithResourceId(R.drawable.ic_octopus_1)
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

    override fun getLayout() = R.layout.fragment_game_levels

    override fun getClassType() = GameLevelsViewModel::class.java
}
