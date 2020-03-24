package ru.inwords.inwords.translation.data.grpc

import dagger.Lazy
import io.grpc.ManagedChannel
import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.authorisation.data.session.NativeTokenHolder
import ru.inwords.inwords.core.grpc.HeaderAttachingClientInterceptor
import ru.inwords.inwords.core.utils.unsafeLazy
import ru.inwords.inwords.dagger.annotations.GrpcDefaultChannel
import ru.inwords.inwords.proto.dictionary.*
import ru.inwords.inwords.translation.converter.WordTranslationReplyConverter
import ru.inwords.inwords.translation.domain.model.EntityIdentificator
import ru.inwords.inwords.translation.domain.model.PullWordsAnswer
import ru.inwords.inwords.translation.domain.model.WordTranslation
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
internal class TranslationGrpcService @Inject constructor(
    @GrpcDefaultChannel managedChannel: Lazy<ManagedChannel>,
    nativeTokenHolder: NativeTokenHolder
) {
    private val authenticatorStub: DictionaryProviderGrpc.DictionaryProviderBlockingStub by unsafeLazy {
        DictionaryProviderGrpc.newBlockingStub(managedChannel.get())
            .withInterceptors(HeaderAttachingClientInterceptor(nativeTokenHolder))
    }

    private val wordTranslationReplyConverter = WordTranslationReplyConverter()

    fun deleteWords(serverIds: List<Int>): Completable {
        val request = DeleteWordsRequest.newBuilder()
            .addAllDelete(serverIds)
            .build()

        return Completable.fromCallable { authenticatorStub.deleteWords(request) }
    }

    fun addWords(words: List<WordTranslation>): Single<List<EntityIdentificator>> {
        val addWordRequestList = words.map {
            AddWordRequest.newBuilder()
                .setLocalId(it.id.toInt()) //TODO type mismatch
                .setWordForeign(it.wordForeign)
                .setWordNative(it.wordNative)
                .build()
        }

        val request = AddWordsRequest.newBuilder()
            .addAllWords(addWordRequestList)
            .build()

        return Single.fromCallable { authenticatorStub.addWords(request) }
            .map { list -> list.wordIdsList.map { EntityIdentificator(it.localId.toLong(), it.serverId) } }
    }

    fun pullWords(serverIds: List<Int>): Single<PullWordsAnswer> {
        val request = GetWordsRequest.newBuilder()
            .addAllUserWordpairIds(serverIds)
            .build()

        return Single.fromCallable { authenticatorStub.getWords(request) }
            .map { PullWordsAnswer(it.toDeleteList, wordTranslationReplyConverter.convertList(it.toAddList)) }
    }
}