package ru.inwords.inwords.data.source.remote

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.subjects.BehaviorSubject
import ru.inwords.inwords.authorisation.data.session.SessionHelper
import ru.inwords.inwords.core.rxjava.ObservableTransformers
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.game.data.bean.GameLevel
import ru.inwords.inwords.game.data.bean.GameResponse
import ru.inwords.inwords.game.data.bean.LevelScore
import ru.inwords.inwords.game.data.bean.TrainingEstimateRequest
import ru.inwords.inwords.game.data.grpc.WordSetGrpcService
import ru.inwords.inwords.profile.data.bean.User
import ru.inwords.inwords.profile.data.grpc.ProfileGrpcService
import ru.inwords.inwords.proto.dictionary.AddWordsReply
import ru.inwords.inwords.proto.dictionary.LookupReply
import ru.inwords.inwords.proto.dictionary.WordsReply
import ru.inwords.inwords.proto.profile.EmailChangeReply
import ru.inwords.inwords.proto.word_set.GetLevelWordsReply
import ru.inwords.inwords.proto.word_set.GetLevelsReply
import ru.inwords.inwords.proto.word_set.WordSetReply
import ru.inwords.inwords.translation.data.grpc.DictionaryGrpcService
import ru.inwords.inwords.translation.domain.model.WordTranslation
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class WebRequestsManagerAuthorisedImpl @Inject internal constructor(
    private val apiServiceAuthorised: ApiServiceAuthorised,
    private val sessionHelper: SessionHelper,
    private val dictionaryGrpcService: DictionaryGrpcService,
    private val wordSetGrpcService: WordSetGrpcService,
    private val profileGrpcService: ProfileGrpcService
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

    override fun requestEmailUpdate(newEmail: String): Single<EmailChangeReply> {
        return valve()
            .flatMap { profileGrpcService.requestEmailUpdate(newEmail) }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun insertAllWords(wordTranslations: List<WordTranslation>): Single<AddWordsReply> {
        return valve()
            .flatMap { dictionaryGrpcService.addWords(wordTranslations) }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun removeAllByServerId(serverIds: List<Int>): Completable {
        return valve()
            .flatMapCompletable { dictionaryGrpcService.deleteWords(serverIds) }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun pullWords(serverIds: List<Int>): Single<WordsReply> {
        return valve()
            .flatMap { dictionaryGrpcService.pullWords(serverIds) }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun lookup(text: String, lang: String): Single<LookupReply> {
        return valve()
            .flatMap { dictionaryGrpcService.lookup(text, lang) }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun getGameInfos(): Single<WordSetReply> {
        return valve()
            .flatMap { wordSetGrpcService.getWordSets() }
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
