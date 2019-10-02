package ru.inwords.inwords.presentation.view_scenario.octo_game.custom_game

import android.os.Bundle
import android.view.View
import android.widget.Button
import androidx.appcompat.widget.Toolbar
import androidx.navigation.fragment.navArgs
import androidx.navigation.ui.NavigationUI
import ru.inwords.inwords.R
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.game.GameLevelInfo
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.presentation.view_scenario.octo_game.OctoGameViewModelFactory


class CustomGameCreatorFragment : FragmentWithViewModelAndNav<CustomGameCreatorViewModel, OctoGameViewModelFactory>() {
    override val layout = R.layout.fragment_custom_game_creator
    override val classType = CustomGameCreatorViewModel::class.java

    private val args by navArgs<CustomGameCreatorFragmentArgs>()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        NavigationUI.setupWithNavController(view.findViewById<Toolbar>(R.id.toolbar), navController)

//        adapter = GamesAdapter(viewModel.navigateToGame)

//        gamesRecycler.layoutManager = GridLayoutManager(context, 2)
//        gamesRecycler.adapter = adapter

        viewModel.navigateToGameLevel
                .observeOn(SchedulersFacade.ui())
                .subscribe(::navigateToGameLevel).disposeOnViewDestroyed()

        view.findViewById<Button>(R.id.start_button).setOnClickListener {
            it.isEnabled = false
            viewModel.onStartClicked(args.wordTranslations.toList())
        }

//        viewModel.screenInfoStream()
//                .map {
//                    if (it is Resource.Success) {
//                        it.data.gameInfos
//                    } else {
//                        showNoContent()
//                        emptyList()
//                    }
//                }
//                .applyDiffUtil()
//                .observeOn(SchedulersFacade.ui())
//                .doOnSubscribe { gamesRecycler.showShimmerAdapter() }
//                .doOnEach { gamesRecycler.hideShimmerAdapter() }
//                .subscribe({
//                    showScreenState(it.first)
//                    adapter.accept(it)
//
//                    fixOverscrollBehaviour(gamesRecycler)
//                }) {
//                    Log.e(javaClass.simpleName, it.message.orEmpty())
//                    showNoContent()
//                }.disposeOnViewDestroyed()
    }

    private fun navigateToGameLevel(gameLevelInfo: GameLevelInfo) {
        navController.navigate(CustomGameCreatorFragmentDirections.actionCustomGameCreatorFragmentToGameLevelFragment(gameLevelInfo, -2))
    }
}