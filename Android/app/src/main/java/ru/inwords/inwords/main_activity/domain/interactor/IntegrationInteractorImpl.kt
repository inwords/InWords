package ru.inwords.inwords.main_activity.domain.interactor

import android.util.Log
import io.reactivex.Completable
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.data.repository.integration.IntegrationDatabaseRepository
import ru.inwords.inwords.game.domain.interactor.GameInteractor
import ru.inwords.inwords.profile.domain.interactor.ProfileInteractor
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class IntegrationInteractorImpl @Inject
internal constructor(
    private val translationWordsInteractor: TranslationWordsInteractor,
    private val profileInteractor: ProfileInteractor,
    private val gameInteractor: GameInteractor,
    private val integrationDatabaseRepository: IntegrationDatabaseRepository
) : IntegrationInteractor {
    override fun getOnAuthCallback(): Completable = Completable.mergeDelayError(
            listOf(
                translationWordsInteractor.tryUploadUpdatesToRemote()
                    .subscribeOn(SchedulersFacade.io()),
                gameInteractor.uploadScoresToServer()
                    .ignoreElement()
                    .subscribeOn(SchedulersFacade.io())
            )
        )
        .doOnError { Log.e(javaClass.simpleName, it.message.orEmpty()) }
        .onErrorComplete()

    override fun getOnUnauthorisedCallback(): Completable = Completable.complete()
        .doOnError { Log.e(javaClass.simpleName, it.message.orEmpty()) }
        .onErrorComplete()

    override fun getOnNewUserCallback(): Completable {
        return Completable.fromAction {
            Log.d(javaClass.simpleName, "New user logged in -> clearing all tables and cache")
            integrationDatabaseRepository.clearAllTables().blockingGet()
            gameInteractor.clearCache()
            profileInteractor.clearCache()
            translationWordsInteractor.clearCache()
        }
    }
}
