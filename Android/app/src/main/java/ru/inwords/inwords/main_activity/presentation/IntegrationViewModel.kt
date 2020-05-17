package ru.inwords.inwords.main_activity.presentation

import android.util.Log
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.main_activity.domain.interactor.IntegrationInteractor
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel

class IntegrationViewModel internal constructor(
    authorisationInteractor: AuthorisationInteractor,
    integrationInteractor: IntegrationInteractor
) : BasicViewModel() {
    init {
        authorisationInteractor.trySignInExistingAccount()
            .onErrorResumeNext { integrationInteractor.getOnUnauthorisedCallback() }
            .subscribeOn(SchedulersFacade.io())
            .subscribe({}, { Log.e(javaClass.simpleName, it.message.orEmpty()) })
            .autoDispose()
    }
}
