package ru.inwords.inwords.authorisation.presentation.choose_method

import androidx.lifecycle.LiveData
import ru.inwords.inwords.NavGraphDirections
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.authorisation.presentation.AuthorisationViewState
import ru.inwords.inwords.core.SingleLiveEvent
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel

class ChooseSignMethodViewModel(
    private val authorisationInteractor: AuthorisationInteractor
) : BasicViewModel() {
    private val authorisationStateLiveData = SingleLiveEvent<AuthorisationViewState>()
    val authorisationState: LiveData<AuthorisationViewState> = authorisationStateLiveData

    fun onNavigateToSignUpClicked() {
        navigateTo(ChooseSignMethodFragmentDirections.toRegistrationFragment(onTopOfLogin = false, onTopOfChooseSignMethod = true))
    }

    fun onSignInGuestClicked() {
        authorisationStateLiveData.setValue(AuthorisationViewState.loading())

        authorisationInteractor.signInGuest()
            .subscribeOn(SchedulersFacade.io())
            .observeOn(SchedulersFacade.ui())
            .subscribe({
                authorisationStateLiveData.setValue(AuthorisationViewState.success())
                navigateTo(NavGraphDirections.actionGlobalPopToStartDestination())
            }, {
                authorisationStateLiveData.setValue(AuthorisationViewState.error(it))
            })
            .autoDispose()
    }

    companion object {
        const val TAG = "ChooseSignMethodViewMod"
    }
}