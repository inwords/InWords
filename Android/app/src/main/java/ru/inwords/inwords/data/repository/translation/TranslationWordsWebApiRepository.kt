package ru.inwords.inwords.data.repository.translation

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.data.dto.EntityIdentificator
import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.data.source.remote.WebRequestsManagerAuthorised
import ru.inwords.inwords.data.sync.PullWordsAnswer
import ru.inwords.inwords.domain.util.absList
import javax.inject.Inject

class TranslationWordsWebApiRepository @Inject
constructor(private val webRequestsManagerAuthorised: WebRequestsManagerAuthorised) : TranslationWordsRemoteRepository {
    override fun addAll(wordTranslations: List<WordTranslation>): Single<List<EntityIdentificator>> {
        return webRequestsManagerAuthorised.insertAllWords(wordTranslations)
    }

    override fun removeAllServerIds(serverIds: List<Int>): Completable {
        return Single.fromCallable { absList(serverIds) }
                .flatMap { webRequestsManagerAuthorised.removeAllServerIds(it) }
                .ignoreElement()
    }

    override fun pullWords(wordTranslations: List<Int>): Single<PullWordsAnswer> {
        return webRequestsManagerAuthorised.pullWords(wordTranslations)
    }
}
