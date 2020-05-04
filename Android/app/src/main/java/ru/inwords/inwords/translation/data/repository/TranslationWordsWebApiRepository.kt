package ru.inwords.inwords.translation.data.repository

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.data.source.remote.WebRequestsManagerAuthorised
import ru.inwords.inwords.translation.converter.LookupReplyConverter
import ru.inwords.inwords.translation.converter.TrainingPairConverter
import ru.inwords.inwords.translation.converter.WordTranslationReplyConverter
import ru.inwords.inwords.translation.domain.model.*
import ru.inwords.inwords.translation.domain.model.LookupDirection.EN_RU
import ru.inwords.inwords.translation.domain.model.LookupDirection.RU_EN
import javax.inject.Inject
import kotlin.math.abs

class TranslationWordsWebApiRepository @Inject internal constructor(
    private val webRequestsManagerAuthorised: WebRequestsManagerAuthorised
) : TranslationWordsRemoteRepository {

    private val wordTranslationReplyConverter = WordTranslationReplyConverter()
    private val trainingPairConverter = TrainingPairConverter()
    private val lookupReplyConverter = LookupReplyConverter()

    override fun insertAllWords(wordTranslations: List<WordTranslation>): Single<List<EntityIdentificator>> {
        return webRequestsManagerAuthorised.insertAllWords(wordTranslations)
            .map { list -> list.wordIdsList.map { EntityIdentificator(it.localId.toLong(), it.serverId) } }
    }

    override fun removeAllByServerId(serverIds: List<Int>): Completable {
        return Single.fromCallable { absList(serverIds) }
            .flatMapCompletable { webRequestsManagerAuthorised.removeAllByServerId(it) }
    }

    override fun pullWords(wordTranslations: List<Int>): Single<PullWordsAnswer> {
        return webRequestsManagerAuthorised.pullWords(wordTranslations)
            .map { PullWordsAnswer(it.toDeleteList, wordTranslationReplyConverter.convertList(it.toAddList)) }
    }

    override fun lookup(text: String, lookupDirection: LookupDirection): Single<List<Definition>> {
        val lang = when (lookupDirection) {
            EN_RU -> "en-ru"
            RU_EN -> "ru-en"
        }

        return webRequestsManagerAuthorised.lookup(text, lang)
            .map { lookupReplyConverter.convert(it) }
    }

    override fun trainingWords(): Single<List<WordTranslation>> {
        return webRequestsManagerAuthorised.trainingWords()
            .map { reply -> reply.pairsList.map { trainingPairConverter.convert(it) } }
    }

    override fun trainingIds(): Single<List<Int>> {
        return webRequestsManagerAuthorised.trainingIds()
            .map { it.userWordPairsList }
    }

    private fun absList(integers: List<Int>): List<Int> = integers.map {
        if (it < 0) {
            Unit //TODO for debug
        }
        abs(it)
    }
}
