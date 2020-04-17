package ru.inwords.inwords.presentation.view_scenario

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import androidx.navigation.NavDirections
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.disposables.Disposable
import ru.inwords.inwords.core.SingleLiveEvent

open class BasicViewModel protected constructor() : ViewModel() {
    protected var compositeDisposable: CompositeDisposable = CompositeDisposable()

    private val _navigateTo = SingleLiveEvent<NavDirections>()
    val navigateTo: LiveData<NavDirections> = _navigateTo

    protected fun navigateTo(navDirections: NavDirections) {
        _navigateTo.postValue(navDirections)
    }

    protected fun Disposable.autoDispose(): Disposable {
        compositeDisposable.add(this)
        return this
    }

    override fun onCleared() {
        compositeDisposable.clear()
    }
}
