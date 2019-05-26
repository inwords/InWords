package ru.inwords.inwords.presentation.viewScenario.main_activity

import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.domain.interactor.integration.IntegrationInteractor
import ru.inwords.inwords.presentation.viewScenario.BasicViewModel

class IntegrationViewModel internal constructor(integrationInteractor: IntegrationInteractor) : BasicViewModel() {
    init {
        compositeDisposable.add(integrationInteractor
                .getOnStartCallback()
                .subscribeOn(SchedulersFacade.io())
                .subscribe())
    }
}
