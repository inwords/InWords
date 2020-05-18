package ru.inwords.inwords.game.presentation.custom_game

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.navArgs
import ru.inwords.inwords.R
import ru.inwords.inwords.databinding.FragmentCustomGameCreatorBinding
import ru.inwords.inwords.game.presentation.WordsSetsViewModelFactory
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav


class CustomGameCreatorFragment : FragmentWithViewModelAndNav<CustomGameCreatorViewModel, WordsSetsViewModelFactory, FragmentCustomGameCreatorBinding>() {
    override val layout = R.layout.fragment_custom_game_creator
    override val classType = CustomGameCreatorViewModel::class.java

    override fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): FragmentCustomGameCreatorBinding {
        return FragmentCustomGameCreatorBinding.inflate(inflater, container, attachToRoot)
    }

    private val args by navArgs<CustomGameCreatorFragmentArgs>()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupWithNavController(binding.toolbar)

//        adapter = GamesAdapter(viewModel.navigateToGame)

//        gamesRecycler.layoutManager = GridLayoutManager(context, 2)
//        gamesRecycler.adapter = adapter

        binding.playCardsCardView.setOnClickListener {
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