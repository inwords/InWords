package ru.inwords.inwords.presentation.view_scenario

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.viewbinding.ViewBinding
import dagger.android.support.DaggerFragment
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.disposables.Disposable

abstract class FragmentWithBinding<Binding : ViewBinding> : DaggerFragment() {
    protected abstract val layout: Int

    private val compositeDisposable = CompositeDisposable()

    private var _binding: Binding? = null
    protected val binding get() = _binding!!

    abstract fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): Binding

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = bindingInflate(inflater, container, false)
        val view = binding.root
        return view
    }

    override fun onDestroyView() {
        compositeDisposable.clear()
        _binding = null
        super.onDestroyView()
    }

    protected fun Disposable.disposeOnViewDestroyed(): Disposable {
        compositeDisposable.add(this)
        return this
    }
}
