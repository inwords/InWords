package com.dreamproject.inwords.domain

import com.dreamproject.inwords.domain.interactor.profile.ProfileInteractor
import com.dreamproject.inwords.domain.interactor.translation.TranslationSyncInteractor
import io.reactivex.Completable
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class IntegrationInteractor @Inject
constructor(private val translationSyncInteractor: TranslationSyncInteractor,
            private val profileInteractor: ProfileInteractor) {
    fun getOnAuthCallback(): Completable = Completable.mergeDelayError(listOf(
            profileInteractor.getAuthorisedUser(true)
                    .firstOrError()
                    .ignoreElement(),
            translationSyncInteractor.presyncOnStart() //TODO may another order with trySync
                    .andThen(translationSyncInteractor.trySyncAllReposWithCache())
    ))
            .onErrorComplete()
}
