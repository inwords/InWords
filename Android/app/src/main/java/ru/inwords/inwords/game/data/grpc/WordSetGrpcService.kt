package ru.inwords.inwords.game.data.grpc

import dagger.Lazy
import io.grpc.ManagedChannel
import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.authorisation.data.session.NativeTokenHolder
import ru.inwords.inwords.core.grpc.HeaderAttachingClientInterceptor
import ru.inwords.inwords.core.utils.unsafeLazy
import ru.inwords.inwords.main_activity.di.annotations.GrpcDefaultChannel
import ru.inwords.inwords.proto.common.Empty
import ru.inwords.inwords.proto.word_set.*
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
internal class WordSetGrpcService @Inject constructor(
    @GrpcDefaultChannel managedChannel: Lazy<ManagedChannel>,
    nativeTokenHolder: NativeTokenHolder
) {
    private val wordSetStub: WordSetProviderGrpc.WordSetProviderBlockingStub by unsafeLazy {
        WordSetProviderGrpc.newBlockingStub(managedChannel.get())
            .withInterceptors(HeaderAttachingClientInterceptor(nativeTokenHolder))
    }

    fun addWordSetToDictionary(wordSetId: Int): Completable {
        val request = WordSetWordsRequest.newBuilder()
            .setWordSetId(wordSetId)
            .build()

        return Completable.fromCallable { wordSetStub.toDictionary(request) }
    }

    fun getWordSets(): Single<WordSetReply> {
        return Single.fromCallable { wordSetStub.getSets(Empty.getDefaultInstance()) }
    }

    fun getLevels(wordSetId: Int): Single<GetLevelsReply> {
        val request = GetLevelsRequest.newBuilder()
            .setWordSetId(wordSetId)
            .build()

        return Single.fromCallable { wordSetStub.getLevels(request) }
    }

    fun getLevelWords(levelId: Int): Single<GetLevelWordsReply> {
        val request = GetLevelWordsRequest.newBuilder()
            .setLevelId(levelId)
            .build()

        return Single.fromCallable { wordSetStub.getLevelWords(request) }
    }

    fun estimate(metrics: List<TrainingDataRequest.Training>): Single<TrainingScoreReply> {
        val request = TrainingDataRequest.newBuilder()
            .addAllMetrics(metrics)
            .build()

        return Single.fromCallable { wordSetStub.estimate(request) }
    }
}