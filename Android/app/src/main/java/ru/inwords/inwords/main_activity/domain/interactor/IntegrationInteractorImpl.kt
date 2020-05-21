package ru.inwords.inwords.main_activity.domain.interactor

import android.content.SharedPreferences
import android.util.Log
import androidx.core.content.edit
import io.reactivex.Completable
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.game.domain.interactor.GameInteractor
import ru.inwords.inwords.main_activity.data.repository.integration.IntegrationDatabaseRepository
import ru.inwords.inwords.profile.domain.interactor.ProfileInteractor
import ru.inwords.inwords.translation.domain.interactor.TrainingInteractor
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor

class IntegrationInteractorImpl internal constructor(
    private val translationWordsInteractor: TranslationWordsInteractor,
    private val profileInteractor: ProfileInteractor,
    private val gameInteractor: GameInteractor,
    private val trainingInteractor: TrainingInteractor,
    private val integrationDatabaseRepository: IntegrationDatabaseRepository,
    private val sharedPreferences: SharedPreferences
) : IntegrationInteractor {
    override fun getOnAuthCallback(): Completable = Completable.mergeDelayError(
        listOf( //TODO getAllWords
            translationWordsInteractor.tryUploadUpdatesToRemote()
                .subscribeOn(SchedulersFacade.io()),
            gameInteractor.uploadScoresToServer()
                .ignoreElement()
                .subscribeOn(SchedulersFacade.io()),
            profileInteractor.getAuthorisedUser()
                .firstOrError()
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
            integrationDatabaseRepository.clearAllTables()
            gameInteractor.clearCache()
            profileInteractor.clearCache()
            translationWordsInteractor.clearCache()
            trainingInteractor.clearCache()
        }
    }

    override fun logout(): Completable {
        return Completable.fromAction {
            Log.d(javaClass.simpleName, "###LOGOUT### clearing all tables, prefs and cache")
            integrationDatabaseRepository.clearAllTables()
            sharedPreferences.edit(commit = true) { clear() }
            gameInteractor.clearCache()
            profileInteractor.clearCache()
            translationWordsInteractor.clearCache()
            trainingInteractor.clearCache()
        }
    }

}
