package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevels

import android.content.Context
import android.os.Bundle
import android.view.View
import com.dreamproject.inwords.R
import com.dreamproject.inwords.core.util.SchedulersFacade
import com.dreamproject.inwords.data.dto.game.GameInfo
import com.dreamproject.inwords.data.dto.game.GameLevelInfo
import com.dreamproject.inwords.domain.GAME_INFO
import com.dreamproject.inwords.domain.GAME_LEVEL_INFO
import com.dreamproject.inwords.domain.util.ColoringUtil
import com.dreamproject.inwords.presentation.viewScenario.FragmentWithViewModelAndNav
import kotlinx.android.synthetic.main.fragment_game_levels.*
import kotlinx.android.synthetic.main.game_level_info.view.*
import kotlinx.android.synthetic.main.game_no_content.*
import javax.inject.Inject

class GameLevelsFragment : FragmentWithViewModelAndNav<GameLevelsViewModel, GameLevelsViewModelFactory>() {
    private lateinit var gameInfo: GameInfo

    @Inject
    lateinit var coloringUtil: ColoringUtil

    override fun onAttach(context: Context?) {
        super.onAttach(context)

        gameInfo = arguments?.getSerializable(GAME_INFO) as GameInfo
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        compositeDisposable.add(viewModel.navigateToGameLevel
                .subscribe(::navigateToGameLevel))

        compositeDisposable.add(viewModel.screenInfoStream(gameInfo.gameId)
                .map { it.game.gameLevelInfos }
                .observeOn(SchedulersFacade.ui())
                .subscribe(::renderGameLevelsInfo) {
                    it.printStackTrace()
                    game_no_content.visibility = View.VISIBLE
                    game_content.visibility = View.GONE
                })
    }

    private fun navigateToGameLevel(gameLevelInfo: GameLevelInfo) {
        val bundle = Bundle()
        bundle.putSerializable(GAME_LEVEL_INFO, gameLevelInfo)
        navController.navigate(R.id.action_gameLevelsFragment_to_gameLevelFragment, bundle)
    }

    private fun renderGameLevelsInfo(gameLevelsInfos: List<GameLevelInfo>) {
        if (!gameLevelsInfos.isEmpty()) {
            game_no_content.visibility = View.GONE
            game_content.visibility = View.VISIBLE
        }

        var counter = 1

        gameLevelsInfos.forEach { gameLevelInfo ->
            with(layoutInflater.inflate(R.layout.game_level_info, levelsGrid, false)) {
                title.text = counter.toString()
                counter++

                ratingBar.rating = gameLevelInfo.playerStars + 2f

                setOnClickListener { viewModel.onGameLevelSelected(gameLevelInfo) }
                levelsGrid.addView(this)
            }
        }
    }

    override fun getLayout() = R.layout.fragment_game_levels

    override fun getClassType() = GameLevelsViewModel::class.java
}
