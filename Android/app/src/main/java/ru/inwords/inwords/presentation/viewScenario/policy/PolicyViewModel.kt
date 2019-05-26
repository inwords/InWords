package ru.inwords.inwords.presentation.viewScenario.policy

import io.reactivex.Completable
import ru.inwords.inwords.domain.interactor.integration.IntegrationInteractor
import ru.inwords.inwords.presentation.viewScenario.BasicViewModel

class PolicyViewModel internal constructor(private val integrationInteractor: IntegrationInteractor) : BasicViewModel() {
    fun setPolicyAgreementState(state: Boolean): Completable {
        return integrationInteractor.setPolicyAgreementState(state)
    }
}
