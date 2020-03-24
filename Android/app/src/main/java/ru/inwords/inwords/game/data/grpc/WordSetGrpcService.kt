package ru.inwords.inwords.game.data.grpc

import dagger.Lazy
import io.grpc.ManagedChannel
import io.reactivex.Completable
import ru.inwords.inwords.authorisation.data.session.NativeTokenHolder
import ru.inwords.inwords.core.grpc.HeaderAttachingClientInterceptor
import ru.inwords.inwords.core.utils.unsafeLazy
import ru.inwords.inwords.dagger.annotations.GrpcDefaultChannel
import ru.inwords.inwords.proto.word_set.WordSetProviderGrpc
import ru.inwords.inwords.proto.word_set.WordSetWordsRequest
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
}