package ru.inwords.inwords.presentation.view_scenario.policy

import io.reactivex.Completable
import ru.inwords.inwords.main_activity.domain.interactor.IntegrationInteractor
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel

class PolicyViewModel internal constructor(private val integrationInteractor: IntegrationInteractor) : BasicViewModel() {
    fun setPolicyAgreementState(state: Boolean): Completable {
        return integrationInteractor.setPolicyAgreementState(state)
    }
}
