package ru.inwords.inwords.data.repository.translation

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.data.dto.EntityIdentificator
import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.data.source.webService.WebRequestsManager
import ru.inwords.inwords.data.sync.PullWordsAnswer
import ru.inwords.inwords.domain.util.absList
import javax.inject.Inject

class TranslationWordsWebApiRepository @Inject
constructor(private val webRequestsManager: WebRequestsManager) : TranslationWordsRemoteRepository {
    override fun addAll(wordTranslations: List<WordTranslation>): Single<List<EntityIdentificator>> {
        return webRequestsManager.insertAllWords(wordTranslations)
    }

    override fun removeAllServerIds(serverIds: List<Int>): Completable {
        return Single.fromCallable { absList(serverIds) }
                .flatMap { webRequestsManager.removeAllServerIds(it) }
                .ignoreElement()
    }

    override fun pullWords(wordTranslations: List<Int>): Single<PullWordsAnswer> {
        return webRequestsManager.pullWords(wordTranslations)
    }
}
