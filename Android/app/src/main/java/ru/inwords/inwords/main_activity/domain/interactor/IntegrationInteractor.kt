package ru.inwords.inwords.main_activity.domain.interactor

import io.reactivex.Completable

interface IntegrationInteractor {
    fun getOnAuthCallback(): Completable
    fun getOnUnauthorisedCallback(): Completable
    fun getOnNewUserCallback(): Completable
}