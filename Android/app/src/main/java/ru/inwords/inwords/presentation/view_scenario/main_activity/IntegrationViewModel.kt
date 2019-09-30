package ru.inwords.inwords.presentation.view_scenario.main_activity

import android.util.Log
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.domain.interactor.authorisation.AuthorisationInteractor
import ru.inwords.inwords.domain.interactor.integration.IntegrationInteractor
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel

class IntegrationViewModel internal constructor(authorisationInteractor: AuthorisationInteractor,
                                                integrationInteractor: IntegrationInteractor) : BasicViewModel() {
    init {
        authorisationInteractor.trySignInExistingAccount()
                .onErrorResumeNext { integrationInteractor.getOnUnauthorisedCallback() }
                .subscribeOn(SchedulersFacade.io())
                .subscribe({}, { Log.e(javaClass.simpleName, it.message.orEmpty()) })
                .autoDispose()
    }
}
