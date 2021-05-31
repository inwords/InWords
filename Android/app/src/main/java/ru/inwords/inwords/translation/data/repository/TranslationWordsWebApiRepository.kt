package ru.inwords.inwords.translation.data.repository

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.core.deferred_entry_manager.EntityIdentificator
import ru.inwords.inwords.network.AuthorisedRequestsManager
import ru.inwords.inwords.translation.converter.LookupReplyConverter
import ru.inwords.inwords.translation.converter.TrainingPairConverter
import ru.inwords.inwords.translation.converter.WordTranslationReplyConverter
import ru.inwords.inwords.translation.data.grpc.DictionaryGrpcService
import ru.inwords.inwords.translation.domain.model.Definition
import ru.inwords.inwords.translation.domain.model.LookupDirection
import ru.inwords.inwords.translation.domain.model.LookupDirection.EN_RU
import ru.inwords.inwords.translation.domain.model.LookupDirection.RU_EN
import ru.inwords.inwords.translation.domain.model.PullWordsAnswer
import ru.inwords.inwords.translation.domain.model.WordTranslation
import kotlin.math.abs

class TranslationWordsWebApiRepository internal constructor(
    private val dictionaryGrpcService: DictionaryGrpcService,
    private val authorisedRequestsManager: AuthorisedRequestsManager
) : TranslationWordsRemoteRepository {

    private val wordTranslationReplyConverter = WordTranslationReplyConverter()
    private val trainingPairConverter = TrainingPairConverter()
    private val lookupReplyConverter = LookupReplyConverter()

    override fun insertAllWords(wordTranslations: List<WordTranslation>): Single<List<EntityIdentificator>> {
        return authorisedRequestsManager.wrapRequest(dictionaryGrpcService.addWords(wordTranslations))
            .map { list -> list.wordIdsList.map { EntityIdentificator(it.localId.toLong(), it.serverId) } }
    }

    override fun removeAllByServerId(serverIds: List<Int>): Completable {
        return Single.fromCallable { absList(serverIds) }
            .flatMapCompletable { authorisedRequestsManager.wrapRequest(dictionaryGrpcService.deleteWords(it)) }
    }

    override fun pullWords(wordTranslations: List<Int>): Single<PullWordsAnswer> {
        return authorisedRequestsManager.wrapRequest(dictionaryGrpcService.pullWords(wordTranslations))
            .map { PullWordsAnswer(it.toDeleteList, wordTranslationReplyConverter.convertList(it.toAddList)) }
    }

    override fun lookup(text: String, lookupDirection: LookupDirection): Single<List<Definition>> {
        val lang = when (lookupDirection) {
            EN_RU -> "en-ru"
            RU_EN -> "ru-en"
        }

        return authorisedRequestsManager.wrapRequest(dictionaryGrpcService.lookup(text, lang))
            .map { lookupReplyConverter.convert(it) }
    }

    override fun trainingWords(): Single<List<WordTranslation>> {
        return authorisedRequestsManager.wrapRequest(dictionaryGrpcService.trainingWords())
            .map { reply -> reply.pairsList.map { trainingPairConverter.convert(it) } }
    }

    override fun trainingIds(): Single<List<Int>> {
        return authorisedRequestsManager.wrapRequest(dictionaryGrpcService.trainingIds())
            .map { it.userWordPairsList }
    }

    private fun absList(integers: List<Int>): List<Int> = integers.map {
        if (it < 0) {
            Unit //TODO for debug
        }
        abs(it)
    }
}
