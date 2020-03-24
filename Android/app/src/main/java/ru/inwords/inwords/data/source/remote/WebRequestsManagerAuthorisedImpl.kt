package ru.inwords.inwords.data.source.remote

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.subjects.BehaviorSubject
import ru.inwords.inwords.authorisation.data.session.SessionHelper
import ru.inwords.inwords.core.rxjava.ObservableTransformers
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.game.data.bean.*
import ru.inwords.inwords.game.data.grpc.WordSetGrpcService
import ru.inwords.inwords.profile.data.bean.User
import ru.inwords.inwords.translation.data.grpc.TranslationGrpcService
import ru.inwords.inwords.translation.domain.model.EntityIdentificator
import ru.inwords.inwords.translation.domain.model.PullWordsAnswer
import ru.inwords.inwords.translation.domain.model.WordTranslation
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class WebRequestsManagerAuthorisedImpl @Inject internal constructor(
    private val apiServiceAuthorised: ApiServiceAuthorised,
    private val sessionHelper: SessionHelper,
    private val translationGrpcService: TranslationGrpcService,
    private val wordSetGrpcService: WordSetGrpcService
) : WebRequestsManagerAuthorised {

    private val authenticatedNotifierSubject = BehaviorSubject.create<Boolean>()

    override fun notifyAuthStateChanged(authorised: Boolean) {
        if (authorised) {
            sessionHelper.resetThreshold()
        }
        authenticatedNotifierSubject.onNext(authorised)
    }

    override fun getLogin(): Single<String> {
        return valve()
            .flatMap { apiServiceAuthorised.getLogin() }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun getAuthorisedUser(): Single<User> {
        return valve()
            .flatMap { apiServiceAuthorised.getAuthorisedUser() }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun getUserById(id: Int): Single<User> {
        return valve()
            .flatMap { apiServiceAuthorised.getUserById(id) }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun updateUser(newUser: User): Completable {
        return valve()
            .flatMapCompletable { apiServiceAuthorised.updateUser(newUser) }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun insertAllWords(wordTranslations: List<WordTranslation>): Single<List<EntityIdentificator>> {
        return valve()
            .flatMap { translationGrpcService.addWords(wordTranslations) }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun removeAllByServerId(serverIds: List<Int>): Completable {
        return valve()
            .flatMapCompletable { translationGrpcService.deleteWords(serverIds) }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun pullWords(serverIds: List<Int>): Single<PullWordsAnswer> {
        return valve()
            .flatMap { translationGrpcService.pullWords(serverIds) }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun getGameInfos(): Single<List<GameInfoResponse>> {
        return valve()
            .flatMap { apiServiceAuthorised.getGameInfos() }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun getGame(gameId: Int): Single<GameResponse> {
        return valve()
            .flatMap { apiServiceAuthorised.getGame(gameId) }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun getLevel(levelId: Int): Single<GameLevel> {
        return valve()
            .flatMap { apiServiceAuthorised.getLevel(levelId) }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun getScore(trainingEstimateRequest: TrainingEstimateRequest): Single<List<LevelScore>> {
        return valve()
            .flatMap { apiServiceAuthorised.getLevelScore(trainingEstimateRequest) }
            .map { it.classicCardLevelResult }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun addWordSetToDictionary(wordSetId: Int): Completable {
        return valve()
            .flatMapCompletable { wordSetGrpcService.addWordSetToDictionary(wordSetId) }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun getWordsForTraining(): Single<List<WordTranslation>> {
        return valve()
            .flatMap { apiServiceAuthorised.getWordsForTraining() }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun getIdsForTraining(): Single<List<Int>> {
        return valve()
            .flatMap { apiServiceAuthorised.getIdsForTraining() }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    private fun valve(): Single<Unit> {
        return Observable.just(Unit)
            .doOnNext { sessionHelper.requireThreshold() }
            .compose(ObservableTransformers.valve(authenticatedNotifierSubject, false))
            .firstOrError()
    }

    private fun <T> Single<T>.interceptError(): Single<T> {
        return doOnError { throwable -> sessionHelper.interceptAuthError(throwable) }
    }

    private fun Completable.interceptError(): Completable {
        return doOnError { throwable -> sessionHelper.interceptAuthError(throwable) }
    }
}
