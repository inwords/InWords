package com.dreamproject.inwords.presentation.viewScenario.octoGame.games

import android.os.Bundle
import android.view.View
import com.dreamproject.inwords.R
import com.dreamproject.inwords.core.util.SchedulersFacade
import com.dreamproject.inwords.data.dto.game.GameInfo
import com.dreamproject.inwords.domain.GAME_INFO
import com.dreamproject.inwords.domain.model.GamesInfoModel
import com.dreamproject.inwords.domain.util.ColoringUtil
import com.dreamproject.inwords.presentation.viewScenario.FragmentWithViewModelAndNav
import kotlinx.android.synthetic.main.fragment_game_levels.*
import kotlinx.android.synthetic.main.game_level_info.view.*
import kotlinx.android.synthetic.main.game_no_content.*
import javax.inject.Inject

class GamesFragment : FragmentWithViewModelAndNav<GamesViewModel, GamesViewModelFactory>() {
    @Inject
    lateinit var coloringUtil: ColoringUtil

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        compositeDisposable.add(viewModel.navigateToGame
                .subscribe(::navigateToGame))

        compositeDisposable.add(viewModel.screenInfoStream()
                .observeOn(SchedulersFacade.ui())
                .subscribe(::render) {
                    it.printStackTrace()
                    game_no_content.visibility = View.VISIBLE
                    game_content.visibility = View.GONE
                })
    }

    private fun navigateToGame(gameInfo: GameInfo) {
        val bundle = Bundle()
        bundle.putSerializable(GAME_INFO, gameInfo)
        navController.navigate(R.id.action_gamesFragment_to_gameLevelsFragment, bundle)
    }

    private fun render(gamesInfoModel: GamesInfoModel) {
        if (gamesInfoModel.shouldShowIntro) {
            //TODO think need this or not
        }

        renderGameInfos(gamesInfoModel.gameInfos)
    }

    private fun renderGameInfos(gameInfos: List<GameInfo>) {
        if (!gameInfos.isEmpty()) {
            game_no_content.visibility = View.GONE
            game_content.visibility = View.VISIBLE
        }

        gameInfos.forEach { gameInfo ->
            with(layoutInflater.inflate(R.layout.game_info, levelsGrid, false)) {
                title.text = gameInfo.title

                setBackgroundColor(coloringUtil.getColorForGameLevelInfo(gameInfo.available || true)) //TODO

                setOnClickListener { viewModel.onGameSelected(gameInfo) }
                levelsGrid.addView(this)
            }
        }
    }

    override fun getLayout() = R.layout.fragment_games

    override fun getClassType() = GamesViewModel::class.java
}