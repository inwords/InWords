package com.dreamproject.inwords.presentation.viewScenario.octoGame.games

import android.os.Bundle
import android.view.View
import androidx.appcompat.widget.PopupMenu
import androidx.recyclerview.widget.GridLayoutManager
import com.dreamproject.inwords.R
import com.dreamproject.inwords.core.RxDiffUtil
import com.dreamproject.inwords.core.util.SchedulersFacade
import com.dreamproject.inwords.data.dto.game.GameInfo
import com.dreamproject.inwords.domain.GAME_INFO
import com.dreamproject.inwords.presentation.viewScenario.octoGame.BaseContentFragment
import com.dreamproject.inwords.presentation.viewScenario.octoGame.OctoGameViewModelFactory
import com.dreamproject.inwords.presentation.viewScenario.octoGame.games.recycler.GameInfosDiffUtilCallback
import com.dreamproject.inwords.presentation.viewScenario.octoGame.games.recycler.GamesAdapter
import kotlinx.android.synthetic.main.fragment_games.*


class GamesFragment : BaseContentFragment<GameInfo, GamesViewModel, OctoGameViewModelFactory>() {
    private lateinit var adapter: GamesAdapter

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        adapter = GamesAdapter(layoutInflater, viewModel.navigateToGame)

        gamesRecycler.layoutManager = GridLayoutManager(context, 2)
        gamesRecycler.adapter = adapter

        compositeDisposable.add(viewModel.navigateToGame
                .subscribe(::navigateToGame))

        compositeDisposable.add(viewModel.screenInfoStream()
                .map {
                    if (it.gameInfosResource.success()) {
                        it.gameInfosResource.data!!
                    } else {
                        emptyList()
                    }
                }
                .compose(RxDiffUtil.calculate(GameInfosDiffUtilCallback.Companion::create))
                .observeOn(SchedulersFacade.ui())
                .subscribe({
                    showScreenState(it.first)
                    adapter.accept(it)
                }) {
                    it.printStackTrace()
                    showNoContent()
                })
    }

    private fun navigateToGame(gameInfo: GameInfo) {
        val bundle = Bundle()
        bundle.putSerializable(GAME_INFO, gameInfo)
        navController.navigate(R.id.action_gamesFragment_to_gameLevelsFragment, bundle)
    }

    private fun showPopupMenu(v: View) { //TODO
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