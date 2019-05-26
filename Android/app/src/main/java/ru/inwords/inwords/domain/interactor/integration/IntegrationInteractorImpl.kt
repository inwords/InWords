package ru.inwords.inwords.domain.interactor.integration

import android.util.Log
import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.data.repository.integration.IntegrationDatabaseRepository
import ru.inwords.inwords.domain.interactor.game.GameInteractor
import ru.inwords.inwords.domain.interactor.profile.ProfileInteractor
import ru.inwords.inwords.domain.interactor.translation.TranslationSyncInteractor
import ru.inwords.inwords.domain.interactor.translation.TranslationWordsInteractor
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class IntegrationInteractorImpl @Inject
internal constructor(private val translationSyncInteractor: TranslationSyncInteractor,
                     private val translationWordsInteractor: TranslationWordsInteractor,
                     private val profileInteractor: ProfileInteractor,
                     private val gameInteractor: GameInteractor,
                     private val integrationDatabaseRepository: IntegrationDatabaseRepository) : IntegrationInteractor {
    override fun getOnAuthCallback(): Completable = Completable.mergeDelayError(listOf(
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

    override fun getOnStartCallback(): Completable = Completable.mergeDelayError(listOf(
            translationSyncInteractor.presyncOnStart()
    ))
            .doOnError(Throwable::printStackTrace)
            .onErrorComplete()

    override fun getOnNewUserCallback(): Completable {
        return Completable.fromAction {
            Log.d(TAG, "New user logged in -> clearing all tables and cache")
            integrationDatabaseRepository.clearAllTables()
            gameInteractor.clearCache()
            profileInteractor.clearCache()
            translationWordsInteractor.clearCache()
        }
    }

    override fun getPolicyAgreementState(): Single<Boolean> {
        return integrationDatabaseRepository.getPolicyAgreementState()
    }

    override fun setPolicyAgreementState(state: Boolean): Completable {
        return integrationDatabaseRepository.setPolicyAgreementState(state)
    }

    companion object {
        const val TAG = "IntegrationInteractor"
    }
}
