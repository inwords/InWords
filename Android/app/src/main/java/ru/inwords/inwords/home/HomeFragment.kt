package ru.inwords.inwords.home

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.material.snackbar.Snackbar
import io.reactivex.disposables.Disposable
import ru.inwords.inwords.R
import ru.inwords.inwords.core.recycler.VerticalSpaceItemDecoration
import ru.inwords.inwords.core.recycler.fixOverscrollBehaviour
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.core.utils.observe
import ru.inwords.inwords.databinding.FragmentHomeBinding
import ru.inwords.inwords.home.recycler.CardsRecyclerAdapter
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav


class HomeFragment : FragmentWithViewModelAndNav<HomeViewModel, HomeViewModelFactory, FragmentHomeBinding>() {
    override val layout = R.layout.fragment_home
    override val classType = HomeViewModel::class.java

    override fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): FragmentHomeBinding {
        return FragmentHomeBinding.inflate(inflater, container, attachToRoot)
    }

    private lateinit var recyclerAdapter: CardsRecyclerAdapter

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupToolbar()

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
            binding.toolbar.title = it.userName
        }
    }

    private fun setupToolbar() {
        binding.toolbar.setOnMenuItemClickListener { menuItem ->
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
        recyclerAdapter = CardsRecyclerAdapter { viewModel.handleNavigation(it) }

        val dividerItemDecoration = VerticalSpaceItemDecoration(resources.getDimensionPixelSize(R.dimen.space_medium))

        with(binding.cardsRecycler) {
            layoutManager = LinearLayoutManager(context)
            addItemDecoration(dividerItemDecoration)
            adapter = recyclerAdapter
        }
    }

    private fun subscribeRecycler(): Disposable {
        return viewModel.cardWrappers
            .observeOn(SchedulersFacade.ui())
            .subscribe({ result ->
                recyclerAdapter.accept(result)

                fixOverscrollBehaviour(binding.cardsRecycler)
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
