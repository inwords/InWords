package ru.inwords.inwords.domain

import android.util.Log
import io.reactivex.Completable
import ru.inwords.inwords.data.repository.integration.IntegrationDatabaseRepository
import ru.inwords.inwords.domain.interactor.game.GameInteractor
import ru.inwords.inwords.domain.interactor.profile.ProfileInteractor
import ru.inwords.inwords.domain.interactor.translation.TranslationSyncInteractor
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class IntegrationInteractor @Inject
internal constructor(private val translationSyncInteractor: TranslationSyncInteractor,
            private val profileInteractor: ProfileInteractor,
            private val gameInteractor: GameInteractor,
            private val integrationDatabaseRepository: IntegrationDatabaseRepository) {
    fun getOnAuthCallback(): Completable = Completable.mergeDelayError(listOf(
            profileInteractor.getAuthorisedUser(true)
                    .firstOrError()
                    .ignoreElement(),
            translationSyncInteractor.presyncOnStart()
                    .andThen(translationSyncInteractor.trySyncAllReposWithCache()),
            gameInteractor.uploadScoresToServer()
                    .ignoreElement()
    ))
            .doOnError(Throwable::printStackTrace)
            .onErrorComplete()

    fun getOnStartCallback(): Completable = Completable.mergeDelayError(listOf(
            translationSyncInteractor.presyncOnStart()
    ))
            .doOnError(Throwable::printStackTrace)
            .onErrorComplete()

    fun getOnNewUserCallback(): Completable {
        return Completable.fromAction {
            Log.d(TAG, "New user logged in -> clearing all tables")
            integrationDatabaseRepository.clearAllTables()
        }
    }

    companion object{
        const val TAG = "IntegrationInteractor"
    }
}
