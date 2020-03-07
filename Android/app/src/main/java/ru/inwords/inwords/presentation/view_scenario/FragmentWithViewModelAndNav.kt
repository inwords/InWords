package ru.inwords.inwords.presentation.view_scenario

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.widget.Toolbar
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.NavController
import androidx.navigation.findNavController
import androidx.navigation.ui.NavigationUI
import androidx.viewbinding.ViewBinding
import com.google.android.material.appbar.CollapsingToolbarLayout
import dagger.android.support.DaggerFragment
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.disposables.Disposable
import ru.inwords.inwords.core.utils.observe
import javax.inject.Inject

abstract class FragmentWithViewModelAndNav<ViewModelType : BasicViewModel, ViewModelFactory : ViewModelProvider.Factory, Binding : ViewBinding> : DaggerFragment() {
    protected lateinit var viewModel: ViewModelType
    @Inject
    lateinit var modelFactory: ViewModelFactory

    private lateinit var navController: NavController

    protected abstract val layout: Int
    protected abstract val classType: Class<ViewModelType>

    private val compositeDisposable = CompositeDisposable()

    private var _binding: Binding? = null
    protected val binding get() = _binding!!

    abstract fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): Binding

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = bindingInflate(inflater, container, false)
        val view = binding.root
        return view
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        navController = view.findNavController()

        observe(viewModel.navigateTo) {
            navController.navigate(it)
        }
    }

    override fun onDestroyView() {
        compositeDisposable.clear()
        _binding = null
        super.onDestroyView()
    }

    override fun onAttach(context: Context) {
        super.onAttach(context)
        viewModel = provideViewModel()
    }

    protected fun setupWithNavController(toolbar: Toolbar) {
        NavigationUI.setupWithNavController(toolbar, navController)
    }

    protected fun setupWithNavController(collapsingToolbarLayout: CollapsingToolbarLayout, toolbar: Toolbar) {
        NavigationUI.setupWithNavController(collapsingToolbarLayout, toolbar, navController)
    }

    protected fun Disposable.disposeOnViewDestroyed(): Disposable {
        compositeDisposable.add(this)
        return this
    }

    protected fun provideViewModel(): ViewModelType {
        return ViewModelProvider(this, modelFactory).get(classType)
    }
}
