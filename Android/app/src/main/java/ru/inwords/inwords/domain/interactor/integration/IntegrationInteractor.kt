package ru.inwords.inwords.domain.interactor.integration

import io.reactivex.Completable
import io.reactivex.Single

interface IntegrationInteractor {
    fun getOnAuthCallback(): Completable
    fun getOnStartCallback(): Completable
    fun getOnNewUserCallback(): Completable
    fun getPolicyAgreementState(): Single<Boolean>
    fun setPolicyAgreementState(state: Boolean): Completable
}