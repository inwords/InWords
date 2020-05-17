package ru.inwords.inwords.game.presentation.games

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.core.view.isVisible
import androidx.recyclerview.widget.LinearLayoutManager
import com.xwray.groupie.Group
import com.xwray.groupie.GroupAdapter
import com.xwray.groupie.GroupieViewHolder
import ru.inwords.inwords.R
import ru.inwords.inwords.core.recycler.EmptySpaceItemDecoration
import ru.inwords.inwords.core.recycler.fixOverscrollBehaviour
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.core.utils.observe
import ru.inwords.inwords.databinding.FragmentGamesBinding
import ru.inwords.inwords.game.domain.model.GameInfo
import ru.inwords.inwords.game.presentation.OctoGameViewModelFactory
import ru.inwords.inwords.game.presentation.games.recycler.ContinueGameItem
import ru.inwords.inwords.game.presentation.games.recycler.GameInfoItem
import ru.inwords.inwords.game.presentation.games.recycler.WordsTrainingItem
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav


class GamesFragment : FragmentWithViewModelAndNav<GamesViewModel, OctoGameViewModelFactory, FragmentGamesBinding>() {
    override val layout = R.layout.fragment_games
    override val classType = GamesViewModel::class.java

    override fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): FragmentGamesBinding {
        return FragmentGamesBinding.inflate(inflater, container, attachToRoot)
    }

    private lateinit var recyclerAdapter: GroupAdapter<GroupieViewHolder>

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupWithNavController(binding.toolbar)

       viewModel.checkPolicy().disposeOnViewDestroyed()

        recyclerAdapter = GroupAdapter<GroupieViewHolder>()

        val dividerItemDecoration = EmptySpaceItemDecoration(resources.getDimensionPixelSize(R.dimen.space_medium))

        with(binding.gamesRecycler) {
            layoutManager = LinearLayoutManager(context)
            addItemDecoration(dividerItemDecoration)
            adapter = recyclerAdapter
        }

        observe(viewModel.toast) {
            Toast.makeText(requireContext(), it, Toast.LENGTH_SHORT).show()
        }

        viewModel.onViewCreated()

        val onItemClickedListener: (GameInfo) -> Unit = { viewModel.navigateToGame(it) }
        val onSaveToDictionaryClickedListener: (GameInfo) -> Unit = {
            AlertDialog.Builder(requireContext())
                .setNegativeButton(R.string.cancel) { _, _ -> }
                .setPositiveButton("Добавить") { _, _ -> viewModel.onSaveToDictionaryClicked(it) }
                .setMessage("Добавить все слова из темы в словарь?")
                .show()
        }

        viewModel.screenInfoStream()
            .subscribeOn(SchedulersFacade.io())
            .map { state ->
                val items = mutableListOf<Group>()
                if (state.gameInfos.isNotEmpty()) {
                    items.add(ContinueGameItem(state.continueGameState) { viewModel.onSuggestionGameClicked() })
                }
                if (state.trainingState is SimpleStateWithVisibility.Visible) {
                    items.add(WordsTrainingItem(state.trainingState.state) { viewModel.onStartTrainingClicked() })
                }
                state.gameInfos.forEach {
                    items.add(GameInfoItem(it, onItemClickedListener, onSaveToDictionaryClickedListener))
                }

                items
            }
            .observeOn(SchedulersFacade.ui())
            .doOnSubscribe { showLoading() }
            .subscribe({
                if (it.isNotEmpty()) {
                    showContent()
                } else {
                    showNoContent()
                }
                recyclerAdapter.updateAsync(it)

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
}