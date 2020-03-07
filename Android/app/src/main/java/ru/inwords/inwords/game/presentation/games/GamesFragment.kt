package ru.inwords.inwords.game.presentation.games

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.widget.PopupMenu
import androidx.core.view.isVisible
import androidx.recyclerview.widget.LinearLayoutManager
import ru.inwords.inwords.R
import ru.inwords.inwords.core.recycler.VerticalSpaceItemDecoration
import ru.inwords.inwords.core.recycler.fixOverscrollBehaviour
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.core.utils.observe
import ru.inwords.inwords.databinding.FragmentGamesBinding
import ru.inwords.inwords.game.domain.model.GameInfo
import ru.inwords.inwords.game.presentation.OctoGameViewModelFactory
import ru.inwords.inwords.game.presentation.games.recycler.GamesAdapter
import ru.inwords.inwords.game.presentation.games.recycler.applyDiffUtil
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav


class GamesFragment : FragmentWithViewModelAndNav<GamesViewModel, OctoGameViewModelFactory, FragmentGamesBinding>() {
    override val layout = R.layout.fragment_games
    override val classType = GamesViewModel::class.java

    override fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): FragmentGamesBinding {
        return FragmentGamesBinding.inflate(inflater, container, attachToRoot)
    }

    private lateinit var recyclerAdapter: GamesAdapter

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupWithNavController(binding.toolbar)

        recyclerAdapter = GamesAdapter(
            onItemClickedListener = { viewModel.navigateToGame(it) },
            onSaveToDictionaryClickedListener = {
                AlertDialog.Builder(requireContext())
                    .setNegativeButton("Отмена") { _, _ -> }
                    .setPositiveButton("Добавить") { _, _ -> viewModel.onSaveToDictionaryClicked(it) }
                    .setMessage("Добавить все слова из темы в словарь?")
                    .show()
            }
        )

        val dividerItemDecoration = VerticalSpaceItemDecoration(resources.getDimensionPixelSize(R.dimen.space_medium))

        with(binding.gamesRecycler) {
            layoutManager = LinearLayoutManager(context)
            addItemDecoration(dividerItemDecoration)
            adapter = recyclerAdapter
        }

        observe(viewModel.toast) {
            Toast.makeText(
                requireContext(),
                if (it) {
                    "Слова сохранены в словарь"
                } else {
                    "Сохранить слова в словарь не удалось"
                },
                Toast.LENGTH_SHORT
            ).show()
        }

        viewModel.screenInfoStream()
            .observeOn(SchedulersFacade.computation())
            .applyDiffUtil()
            .observeOn(SchedulersFacade.ui())
            .doOnSubscribe { showLoading() }
            .subscribe({
                if (it.first.isNotEmpty()) {
                    showContent()
                } else {
                    showNoContent()
                }
                recyclerAdapter.accept(it)

                fixOverscrollBehaviour(binding.gamesRecycler)
            }) {
                Log.e(javaClass.simpleName, it.message.orEmpty())
                showNoContent()
            }.disposeOnViewDestroyed()
    }

    private fun showContent() {
        binding.gamesRecycler.isVisible = true
        binding.gameNoContent.root.isVisible = false
        binding.progress.isVisible = false
        /*
            game_menu.setOnClickListener { showPopupMenu(it) }
            game_menu.tag = gameInfo
         */
    }

    private fun showNoContent() {
        binding.gamesRecycler.isVisible = false
        binding.gameNoContent.root.isVisible = true
        binding.progress.isVisible = false
    }

    private fun showLoading() {
        binding.gamesRecycler.isVisible = false
        binding.gameNoContent.root.isVisible = false
        binding.progress.isVisible = true
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
}