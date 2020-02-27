package ru.inwords.inwords.game.presentation.games

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.widget.PopupMenu
import androidx.recyclerview.widget.GridLayoutManager
import ru.inwords.inwords.R
import ru.inwords.inwords.core.recycler.fixOverscrollBehaviour
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.databinding.FragmentGamesBinding
import ru.inwords.inwords.game.domain.model.GameInfoModel
import ru.inwords.inwords.game.presentation.BaseContentFragment
import ru.inwords.inwords.game.presentation.OctoGameViewModelFactory
import ru.inwords.inwords.game.presentation.games.recycler.GamesAdapter
import ru.inwords.inwords.game.presentation.games.recycler.applyDiffUtil


class GamesFragment : BaseContentFragment<GameInfoModel, GamesViewModel, OctoGameViewModelFactory, FragmentGamesBinding>() {
    override val layout = R.layout.fragment_games
    override val classType = GamesViewModel::class.java

    override fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): FragmentGamesBinding {
        return FragmentGamesBinding.inflate(inflater, container, attachToRoot)
    }

    override val noContentViewId = R.id.games_recycler

    private lateinit var adapter: GamesAdapter

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupWithNavController(binding.toolbar)

        adapter = GamesAdapter { viewModel.navigateToGame(it) }

        binding.gamesRecycler.layoutManager = GridLayoutManager(context, 2)
        binding.gamesRecycler.adapter = adapter

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
            .doOnSubscribe { binding.gamesRecycler.showShimmerAdapter() }
            .doOnEach { binding.gamesRecycler.hideShimmerAdapter() }
            .subscribe({
                showScreenState(it.first)
                adapter.accept(it)

                fixOverscrollBehaviour(binding.gamesRecycler)
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