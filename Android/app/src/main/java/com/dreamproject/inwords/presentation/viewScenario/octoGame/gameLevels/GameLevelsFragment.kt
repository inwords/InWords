package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevels

import android.content.Context
import android.os.Bundle
import android.view.View
import androidx.recyclerview.widget.GridLayoutManager
import com.dreamproject.inwords.R
import com.dreamproject.inwords.core.RxDiffUtil
import com.dreamproject.inwords.core.util.SchedulersFacade
import com.dreamproject.inwords.data.dto.game.Game
import com.dreamproject.inwords.data.dto.game.GameInfo
import com.dreamproject.inwords.data.dto.game.GameLevelInfo
import com.dreamproject.inwords.domain.GAME
import com.dreamproject.inwords.domain.GAME_INFO
import com.dreamproject.inwords.domain.GAME_LEVEL_INFO
import com.dreamproject.inwords.presentation.viewScenario.FragmentWithViewModelAndNav
import com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevels.recycler.GameLevelsAdapter
import com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevels.recycler.GameLevelsDiffUtilCallback
import com.facebook.imagepipeline.request.ImageRequestBuilder
import kotlinx.android.synthetic.main.fragment_game_levels.*
import kotlinx.android.synthetic.main.game_no_content.*
import kotlinx.android.synthetic.main.game_welcome.*

class GameLevelsFragment : FragmentWithViewModelAndNav<GameLevelsViewModel, GameLevelsViewModelFactory>() {
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
                .observeOn(SchedulersFacade.computation())
                .map {
                    if (it.game.success()) {
                        game = it.game.data!!
                        game.gameLevelInfos
                    } else {
                        emptyList()
                    }
                }
                .compose(RxDiffUtil.calculate(GameLevelsDiffUtilCallback.Companion::create))
                .observeOn(SchedulersFacade.ui())
                .subscribe({
                    renderScreenState(it.first)
                    adapter.accept(it)
                }) {
                    it.printStackTrace()
                    renderNoContent()
                })
    }

    private fun navigateToGameLevel(gameLevelInfo: GameLevelInfo) {
        val bundle = Bundle()
        bundle.putSerializable(GAME_LEVEL_INFO, gameLevelInfo)
        bundle.putSerializable(GAME, game)
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

    private fun renderScreenState(gameLevelsInfos: List<GameLevelInfo>) {
        if (gameLevelsInfos.isNotEmpty()) {
            game_no_content.visibility = View.GONE
            game_content.visibility = View.VISIBLE
        } else {
            renderNoContent()
        }
    }

    private fun renderNoContent() {
        game_no_content.visibility = View.VISIBLE
        game_content.visibility = View.GONE
    }

    override fun getLayout() = R.layout.fragment_game_levels

    override fun getClassType() = GameLevelsViewModel::class.java
}
