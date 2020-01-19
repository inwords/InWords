package ru.inwords.inwords.policy.presentation

import io.reactivex.Completable
import ru.inwords.inwords.policy.domain.interactor.PolicyInteractor
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel

class PolicyViewModel internal constructor(private val policyInteractor: PolicyInteractor) : BasicViewModel() {
    fun setPolicyAgreementState(state: Boolean): Completable {
        return policyInteractor.setPolicyAgreementState(state)
    }
}
