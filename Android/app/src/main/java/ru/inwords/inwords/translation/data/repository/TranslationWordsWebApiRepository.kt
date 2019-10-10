package ru.inwords.inwords.translation.data.repository

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.data.source.remote.WebRequestsManagerAuthorised
import ru.inwords.inwords.translation.data.absList
import ru.inwords.inwords.translation.data.bean.EntityIdentificator
import ru.inwords.inwords.translation.data.bean.WordTranslation
import ru.inwords.inwords.translation.data.sync.PullWordsAnswer
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
