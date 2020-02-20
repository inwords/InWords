package ru.inwords.inwords.game.presentation.custom_game

import android.os.Bundle
import android.view.View
import androidx.navigation.fragment.navArgs
import com.google.android.material.card.MaterialCardView
import ru.inwords.inwords.R
import ru.inwords.inwords.game.presentation.OctoGameViewModelFactory
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav


class CustomGameCreatorFragment : FragmentWithViewModelAndNav<CustomGameCreatorViewModel, OctoGameViewModelFactory>() {
    override val layout = R.layout.fragment_custom_game_creator
    override val classType = CustomGameCreatorViewModel::class.java

    private val args by navArgs<CustomGameCreatorFragmentArgs>()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupWithNavController(view.findViewById(R.id.toolbar))

//        adapter = GamesAdapter(viewModel.navigateToGame)

//        gamesRecycler.layoutManager = GridLayoutManager(context, 2)
//        gamesRecycler.adapter = adapter

        view.findViewById<MaterialCardView>(R.id.play_cards_card_view).setOnClickListener {
            it.isClickable = false
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
}