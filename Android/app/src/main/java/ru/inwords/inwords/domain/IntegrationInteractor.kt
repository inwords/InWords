package ru.inwords.inwords.domain

import io.reactivex.Completable
import ru.inwords.inwords.domain.interactor.game.GameInteractor
import ru.inwords.inwords.domain.interactor.profile.ProfileInteractor
import ru.inwords.inwords.domain.interactor.translation.TranslationSyncInteractor
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class IntegrationInteractor @Inject
constructor(private val translationSyncInteractor: TranslationSyncInteractor,
            private val profileInteractor: ProfileInteractor,
            private val gameInteractor: GameInteractor) {
    fun getOnAuthCallback(): Completable = Completable.mergeDelayError(listOf(
            profileInteractor.getAuthorisedUser(true)
                    .firstOrError()
                    .ignoreElement(),
            translationSyncInteractor.presyncOnStart() //TODO may another order with trySync
                    .andThen(translationSyncInteractor.trySyncAllReposWithCache()),
            gameInteractor.uploadScoresToServer()
                    .ignoreElement()
    ))
            .doOnError(Throwable::printStackTrace)
            .onErrorComplete()
}
