package ru.inwords.inwords.game.presentation.games

import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.appcompat.widget.PopupMenu
import androidx.recyclerview.widget.GridLayoutManager
import kotlinx.android.synthetic.main.fragment_games.*
import ru.inwords.inwords.R
import ru.inwords.inwords.core.recycler.fixOverscrollBehaviour
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.game.domain.model.GameInfoModel
import ru.inwords.inwords.game.presentation.BaseContentFragment
import ru.inwords.inwords.game.presentation.OctoGameViewModelFactory
import ru.inwords.inwords.game.presentation.games.recycler.GamesAdapter
import ru.inwords.inwords.game.presentation.games.recycler.applyDiffUtil


class GamesFragment : BaseContentFragment<GameInfoModel, GamesViewModel, OctoGameViewModelFactory>() {
    override val layout = R.layout.fragment_games
    override val classType = GamesViewModel::class.java

    private lateinit var adapter: GamesAdapter

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        adapter = GamesAdapter(viewModel.navigateToGame)

        gamesRecycler.layoutManager = GridLayoutManager(context, 2)
        gamesRecycler.adapter = adapter

        viewModel.navigateToGame.subscribe(::navigateToGame).disposeOnViewDestroyed()

        viewModel.screenInfoStream()
            .observeOn(SchedulersFacade.ui())
            .map {
                if (it is Resource.Success) {
                    it.data.gameInfos
                } else {
                    showNoContent()
                    emptyList()
                }
            }
            .observeOn(SchedulersFacade.computation())
            .applyDiffUtil()
            .observeOn(SchedulersFacade.ui())
            .doOnSubscribe { gamesRecycler.showShimmerAdapter() }
            .doOnEach { gamesRecycler.hideShimmerAdapter() }
            .subscribe({
                showScreenState(it.first)
                adapter.accept(it)

                fixOverscrollBehaviour(gamesRecycler)
            }) {
                Log.e(javaClass.simpleName, it.message.orEmpty())
                showNoContent()
            }.disposeOnViewDestroyed()
    }

    private fun navigateToGame(gameInfo: GameInfoModel) {
        navController.navigate(GamesFragmentDirections.actionGamesFragmentToGameLevelsFragment(gameInfo))
    }

    private fun showPopupMenu(v: View) { //TODO
        context?.let {
            with(PopupMenu(it, v)) {
                inflate(R.menu.game_actions)

                setOnMenuItemClickListener { item ->
                    when (item.itemId) {
                        R.id.game_remove -> {
                            viewModel.onGameRemoved(v.tag as GameInfoModel)
                            true
                        }
                        else -> false
                    }
                }

                show()
            }
        }
    }
}