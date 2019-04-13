package com.dreamproject.inwords.presentation.viewScenario.octoGame.games

import android.os.Bundle
import android.view.View
import androidx.appcompat.widget.PopupMenu
import com.dreamproject.inwords.R
import com.dreamproject.inwords.core.util.SchedulersFacade
import com.dreamproject.inwords.data.dto.game.GameInfo
import com.dreamproject.inwords.domain.GAME_INFO
import com.dreamproject.inwords.domain.model.GamesInfoModel
import com.dreamproject.inwords.presentation.viewScenario.FragmentWithViewModelAndNav
import kotlinx.android.synthetic.main.fragment_games.*
import kotlinx.android.synthetic.main.game_info.view.*
import kotlinx.android.synthetic.main.game_no_content.*


class GamesFragment : FragmentWithViewModelAndNav<GamesViewModel, GamesViewModelFactory>() {
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

        if (gamesInfoModel.gameInfos.success()) {
            renderGameInfos(gamesInfoModel.gameInfos.data!!)
        }
    }

    private fun renderGameInfos(gameInfos: List<GameInfo>) {
        if (gameInfos.isNotEmpty()) {
            game_no_content.visibility = View.GONE
            game_content.visibility = View.VISIBLE
        }

        gameInfos.forEach { gameInfo ->
            with(layoutInflater.inflate(R.layout.game_info, levelsGrid, false)) {
                title.text = gameInfo.title

                setOnClickListener { viewModel.onGameSelected(gameInfo) }
                game_menu.setOnClickListener { showPopupMenu(it) }
                game_menu.tag = gameInfo

                levelsGrid.addView(this)
            }
        }
    }

    private fun showPopupMenu(v: View) {
        context?.let {
            with(PopupMenu(it, v)) {
                inflate(R.menu.game_actions)

                setOnMenuItemClickListener { item ->
                    when (item.itemId) {
                        R.id.game_remove -> {
                            viewModel.onGameRemoved(v.tag as GameInfo)
                            true
                        }
                        else -> false
                    }
                }

                show()
            }
        }
    }

    override fun getLayout() = R.layout.fragment_games

    override fun getClassType() = GamesViewModel::class.java
}