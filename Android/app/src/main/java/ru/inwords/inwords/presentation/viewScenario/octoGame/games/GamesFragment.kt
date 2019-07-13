package ru.inwords.inwords.presentation.viewScenario.octoGame.games

import android.os.Bundle
import android.view.View
import androidx.appcompat.widget.PopupMenu
import androidx.recyclerview.widget.GridLayoutManager
import kotlinx.android.synthetic.main.fragment_games.*
import ru.inwords.inwords.R
import ru.inwords.inwords.core.fixOverscrollBehaviour
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.game.GameInfo
import ru.inwords.inwords.domain.model.Resource
import ru.inwords.inwords.presentation.GAME_INFO
import ru.inwords.inwords.presentation.viewScenario.octoGame.BaseContentFragment
import ru.inwords.inwords.presentation.viewScenario.octoGame.OctoGameViewModelFactory
import ru.inwords.inwords.presentation.viewScenario.octoGame.games.recycler.GamesAdapter
import ru.inwords.inwords.presentation.viewScenario.octoGame.games.recycler.applyDiffUtil


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
                    if (it.gameInfosResource is Resource.Success) {
                        it.gameInfosResource.data
                    } else {
                        emptyList()
                    }
                }
                .applyDiffUtil()
                .observeOn(SchedulersFacade.ui())
                .doOnSubscribe { gamesRecycler.showShimmerAdapter() }
                .doOnEach { gamesRecycler.hideShimmerAdapter() }
                .subscribe({
                    showScreenState(it.first)
                    adapter.accept(it)

                    fixOverscrollBehaviour(gamesRecycler)
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