package ru.inwords.inwords.presentation.view_scenario.home

import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.recyclerview.widget.LinearLayoutManager
import io.reactivex.disposables.Disposable
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject
import kotlinx.android.synthetic.main.fragment_home.*
import ru.inwords.inwords.R
import ru.inwords.inwords.core.recycler.VerticalSpaceItemDecoration
import ru.inwords.inwords.core.recycler.fixOverscrollBehaviour
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.presentation.view_scenario.home.recycler.CardWrapper
import ru.inwords.inwords.presentation.view_scenario.home.recycler.CardsRecyclerAdapter


class HomeFragment : FragmentWithViewModelAndNav<HomeViewModel, HomeViewModelFactory>() {
    override val layout = R.layout.fragment_home
    override val classType = HomeViewModel::class.java

    private val onItemClickListener: Subject<CardWrapper> = PublishSubject.create()
    private lateinit var adapter: CardsRecyclerAdapter

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        subscribePolicy().disposeOnViewDestroyed()

        subscribeListener().disposeOnViewDestroyed()

        setupRecycler()
        subscribeRecycler().disposeOnViewDestroyed()
    }

    private fun subscribeListener(): Disposable {
        return onItemClickListener.subscribe {
            when (it) {
                is CardWrapper.CreateAccountMarker -> navController.navigate(HomeFragmentDirections.actionMainFragmentToLoginFragment())
                is CardWrapper.ProfileLoadingMarker -> Unit
                is CardWrapper.ProfileModel -> navController.navigate(HomeFragmentDirections.actionMainFragmentToProfileFragment())
                is CardWrapper.DictionaryModel -> navController.navigate(HomeFragmentDirections.actionMainFragmentToDictionary())
            }
        }
    }

    private fun setupRecycler() {
        adapter = CardsRecyclerAdapter(onItemClickListener)

        val dividerItemDecoration = VerticalSpaceItemDecoration(resources.getDimensionPixelSize(R.dimen.space_medium))

        cards_recycler.layoutManager = LinearLayoutManager(context)
        cards_recycler.addItemDecoration(dividerItemDecoration)
        cards_recycler.adapter = adapter
    }

    private fun subscribeRecycler(): Disposable {
        return viewModel.cardWrappers
                .observeOn(SchedulersFacade.ui())
                .subscribe({
                    adapter.accept(it)

                    fixOverscrollBehaviour(cards_recycler)
                }) {
                    Log.e(javaClass.simpleName, it.message.orEmpty())
                }
    }

    private fun subscribePolicy(): Disposable {
        return viewModel.getPolicyAgreementState()
                .subscribeOn(SchedulersFacade.io())
                .observeOn(SchedulersFacade.ui())
                .subscribe { agreed ->
                    if (!agreed && !isStateSaved) {
                        navController.navigate(HomeFragmentDirections.actionMainFragmentToPolicyFragment())
                    }
                }
    }
}
