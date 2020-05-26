package ru.inwords.inwords.presentation.view_scenario

import androidx.annotation.IdRes
import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import androidx.navigation.NavDirections
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.disposables.Disposable
import ru.inwords.inwords.core.SingleLiveEvent
import ru.inwords.inwords.presentation.NavCommand
import ru.inwords.inwords.presentation.NavigateToCommand
import ru.inwords.inwords.presentation.NavigateToGraphWithChangedStartDestinationCommand

open class BasicViewModel protected constructor() : ViewModel() {
    protected var compositeDisposable: CompositeDisposable = CompositeDisposable()

    private val _navigateTo = SingleLiveEvent<NavCommand>()
    val navigateTo: LiveData<NavCommand> = _navigateTo

    fun navigateTo(navDirections: NavDirections) {
        _navigateTo.postValue(NavigateToCommand(navDirections))
    }

    fun navigateTo(graphDirection: NavDirections, @IdRes newStartDestination: Int) {
        _navigateTo.postValue(NavigateToGraphWithChangedStartDestinationCommand(graphDirection, newStartDestination))
    }

    protected fun Disposable.autoDispose(): Disposable {
        compositeDisposable.add(this)
        return this
    }

    override fun onCleared() {
        compositeDisposable.clear()
    }
}
