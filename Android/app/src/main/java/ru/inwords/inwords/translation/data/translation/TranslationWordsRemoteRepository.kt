package ru.inwords.inwords.translation.data.translation

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.translation.data.bean.EntityIdentificator
import ru.inwords.inwords.translation.data.bean.WordTranslation
import ru.inwords.inwords.translation.data.sync.PullWordsAnswer

//Here any methods connected with manipulating data needed for Translation
interface TranslationWordsRemoteRepository {
    fun addAll(wordTranslations: List<WordTranslation>): Single<List<EntityIdentificator>>

    fun removeAllServerIds(serverIds: List<Int>): Completable

    fun pullWords(wordTranslations: List<Int>): Single<PullWordsAnswer>
}
