package ru.inwords.inwords.main_activity.data.source.remote

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.subjects.BehaviorSubject
import ru.inwords.inwords.authorisation.data.session.SessionHelper
import ru.inwords.inwords.core.rxjava.ObservableTransformers
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.game.data.grpc.WordSetGrpcService
import ru.inwords.inwords.profile.data.grpc.ProfileGrpcService
import ru.inwords.inwords.proto.dictionary.*
import ru.inwords.inwords.proto.profile.EmailChangeReply
import ru.inwords.inwords.proto.profile.ProfileReply
import ru.inwords.inwords.proto.word_set.*
import ru.inwords.inwords.translation.data.grpc.DictionaryGrpcService
import ru.inwords.inwords.translation.domain.model.WordTranslation
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class WebRequestsManagerAuthorisedImpl @Inject internal constructor(
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

    override fun getAuthorisedUser(): Single<ProfileReply> {
        return valve()
            .flatMap { profileGrpcService.current() }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun updateUser(newNickName:String): Completable {
        return valve()
            .flatMapCompletable { profileGrpcService.update(newNickName) }
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

    override fun getLevels(wordSetId: Int): Single<GetLevelsReply> {
        return valve()
            .flatMap { wordSetGrpcService.getLevels(wordSetId) }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun getLevelWords(levelId: Int): Single<GetLevelWordsReply> {
        return valve()
            .flatMap { wordSetGrpcService.getLevelWords(levelId) }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun estimate(cardGameMetrics: List<TrainingDataRequest.Training>): Single<TrainingScoreReply> {
        return valve()
            .flatMap { wordSetGrpcService.estimate(cardGameMetrics) }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun addWordSetToDictionary(wordSetId: Int): Completable {
        return valve()
            .flatMapCompletable { wordSetGrpcService.addWordSetToDictionary(wordSetId) }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun trainingWords(): Single<TrainingReply> {
        return valve()
            .flatMap { dictionaryGrpcService.trainingWords() }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun trainingIds(): Single<TrainingIdsReply> {
        return valve()
            .flatMap { dictionaryGrpcService.trainingIds() }
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
