package ru.inwords.inwords.presentation.viewScenario.main_activity

import android.util.Log
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.domain.interactor.authorisation.AuthorisationInteractor
import ru.inwords.inwords.domain.interactor.integration.IntegrationInteractor
import ru.inwords.inwords.presentation.viewScenario.BasicViewModel

class IntegrationViewModel internal constructor(authorisationInteractor: AuthorisationInteractor,
                                                integrationInteractor: IntegrationInteractor) : BasicViewModel() {
    init {
        compositeDisposable.add(authorisationInteractor.trySignInExistingAccount()
                .onErrorResumeNext { integrationInteractor.getOnUnauthorisedCallback() }
                .subscribeOn(SchedulersFacade.io())
                .subscribe({}, { Log.e(javaClass.simpleName, it.message.orEmpty()) }))
    }
}
