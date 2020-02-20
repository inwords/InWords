package ru.inwords.inwords.home

import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.material.snackbar.Snackbar
import io.reactivex.disposables.Disposable
import kotlinx.android.synthetic.main.fragment_home.*
import kotlinx.android.synthetic.main.fragment_translation_main.view.*
import ru.inwords.inwords.R
import ru.inwords.inwords.core.recycler.VerticalSpaceItemDecoration
import ru.inwords.inwords.core.recycler.fixOverscrollBehaviour
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.core.utils.observe
import ru.inwords.inwords.home.recycler.CardsRecyclerAdapter
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav


class HomeFragment : FragmentWithViewModelAndNav<HomeViewModel, HomeViewModelFactory>() {
    override val layout = R.layout.fragment_home
    override val classType = HomeViewModel::class.java

    private lateinit var adapter: CardsRecyclerAdapter

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupToolbar(view)

        subscribePolicy().disposeOnViewDestroyed()

        observeData(view)

        setupRecycler()
        subscribeRecycler().disposeOnViewDestroyed()
    }

    private fun observeData(view: View) {
        observe(viewModel.error) {
            Snackbar.make(view, R.string.unable_to_load_exercise, Snackbar.LENGTH_SHORT).show()
        }

        observe(viewModel.profile) {
            toolbar.title = it.userName
        }
    }

    private fun setupToolbar(view: View) = with(view) {
        toolbar.setOnMenuItemClickListener { menuItem ->
            when (menuItem.itemId) {
                R.id.action_profile -> {
                    viewModel.navigateToProfile()
                    true
                }
                else -> false
            }
        }
    }

    private fun setupRecycler() {
        adapter = CardsRecyclerAdapter { viewModel.handleNavigation(it) }

        val dividerItemDecoration = VerticalSpaceItemDecoration(resources.getDimensionPixelSize(R.dimen.space_medium))

        cards_recycler.layoutManager = LinearLayoutManager(context)
        cards_recycler.addItemDecoration(dividerItemDecoration)
        cards_recycler.adapter = adapter
    }

    private fun subscribeRecycler(): Disposable {
        return viewModel.cardWrappers
            .observeOn(SchedulersFacade.ui())
            .subscribe({ result ->
                adapter.accept(result)

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
                    viewModel.navigateToPolicy()
                }
            }
    }
}
