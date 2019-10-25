package ru.inwords.inwords.presentation.view_scenario

import androidx.lifecycle.ViewModel

import io.reactivex.disposables.CompositeDisposable
import io.reactivex.disposables.Disposable

open class BasicViewModel protected constructor() : ViewModel() {
    protected var compositeDisposable: CompositeDisposable = CompositeDisposable()

    protected fun Disposable.autoDispose(): Disposable {
        compositeDisposable.add(this)
        return this
    }

    override fun onCleared() {
        compositeDisposable.clear()
    }
}
