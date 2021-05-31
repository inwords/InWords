package ru.inwords.inwords.presentation.view_scenario

import android.content.Context
import android.os.Bundle
import android.view.View
import androidx.annotation.IdRes
import androidx.appcompat.widget.Toolbar
import androidx.fragment.app.FragmentActivity
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.NavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.NavigationUI
import androidx.navigation.ui.setupWithNavController
import androidx.viewbinding.ViewBinding
import com.google.android.material.appbar.CollapsingToolbarLayout
import io.reactivex.disposables.CompositeDisposable
import ru.inwords.inwords.R
import ru.inwords.inwords.core.utils.observe
import javax.inject.Inject

abstract class FragmentWithViewModelAndNav<ViewModelType : BasicViewModel, ViewModelFactory : ViewModelProvider.Factory, Binding : ViewBinding> : FragmentWithBinding<Binding>() {
    protected lateinit var viewModel: ViewModelType

    @Inject
    lateinit var modelFactory: ViewModelFactory

    private lateinit var navController: NavController

    protected abstract val classType: Class<ViewModelType>
    protected open val navigationEnabled: Boolean = true

    private val compositeDisposable = CompositeDisposable()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        if (navigationEnabled) {
            navController = requireActivity().findNavController(R.id.main_nav_host_fragment)

            observe(viewModel.navigateTo) {
                it.perform(navController)
            }
        }
    }

    /**
     * Workaround according to https://issuetracker.google.com/issues/142847973#comment8
     */
    private fun FragmentActivity.findNavController(@IdRes viewId: Int) =
        (supportFragmentManager.findFragmentById(viewId) as NavHostFragment).navController


    override fun onAttach(context: Context) {
        super.onAttach(context)
        viewModel = provideViewModel()
    }

    protected fun setupWithNavController(toolbar: Toolbar) {
        toolbar.setupWithNavController(navController)
    }

    protected fun setupWithNavController(collapsingToolbarLayout: CollapsingToolbarLayout, toolbar: Toolbar) {
        NavigationUI.setupWithNavController(collapsingToolbarLayout, toolbar, navController)
    }

    protected open fun provideViewModel(): ViewModelType {
        return ViewModelProvider(this, modelFactory).get(classType)
    }
}
