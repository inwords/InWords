package ru.inwords.inwords.presentation.viewScenario

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.NavController
import androidx.navigation.Navigation
import dagger.android.support.DaggerFragment
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.disposables.Disposable
import javax.inject.Inject

abstract class FragmentWithViewModelAndNav<ViewModelType : ViewModel, ViewModelFactory : ViewModelProvider.Factory> : DaggerFragment() {
    protected lateinit var viewModel: ViewModelType
    @Inject
    lateinit var modelFactory: ViewModelFactory

    protected lateinit var navController: NavController

    protected abstract val layout: Int
    protected abstract val classType: Class<ViewModelType>

    private val compositeDisposable = CompositeDisposable()

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View {
        return inflater.inflate(layout, container, false)
    }

    override fun onDestroyView() {
        compositeDisposable.clear()

        super.onDestroyView()
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        navController = Navigation.findNavController(view)
    }

    override fun onAttach(context: Context) {
        super.onAttach(context)
        viewModel = provideViewModel()
    }

    protected fun Disposable.disposeOnViewDestroyed(): Disposable {
        compositeDisposable.add(this)
        return this
    }

    protected fun provideViewModel(): ViewModelType {
        return ViewModelProviders.of(this, modelFactory).get(classType)
    }
}
