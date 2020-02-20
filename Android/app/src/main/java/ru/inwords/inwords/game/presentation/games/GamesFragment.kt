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

    override val noContentViewId = R.id.games_recycler

    private lateinit var adapter: GamesAdapter

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupWithNavController(toolbar)

        adapter = GamesAdapter { viewModel.navigateToGame(it) }

        games_recycler.layoutManager = GridLayoutManager(context, 2)
        games_recycler.adapter = adapter

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
            .doOnSubscribe { games_recycler.showShimmerAdapter() }
            .doOnEach { games_recycler.hideShimmerAdapter() }
            .subscribe({
                showScreenState(it.first)
                adapter.accept(it)

                fixOverscrollBehaviour(games_recycler)
            }) {
                Log.e(javaClass.simpleName, it.message.orEmpty())
                showNoContent()
            }.disposeOnViewDestroyed()
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