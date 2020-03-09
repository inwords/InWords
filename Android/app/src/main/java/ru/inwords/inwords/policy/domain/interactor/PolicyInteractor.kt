package ru.inwords.inwords.policy.domain.interactor

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.data.repository.integration.IntegrationDatabaseRepository

class PolicyInteractor(private val integrationDatabaseRepository: IntegrationDatabaseRepository) {
    fun getPolicyAgreementState(): Single<Boolean> {
        return integrationDatabaseRepository.getPolicyAgreementState()
    }

    fun setPolicyAgreementState(state: Boolean): Completable {
        return integrationDatabaseRepository.setPolicyAgreementState(state)
    }
}