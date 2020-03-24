package ru.inwords.inwords.translation.data.repository

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.translation.domain.model.EntityIdentificator
import ru.inwords.inwords.translation.domain.model.PullWordsAnswer
import ru.inwords.inwords.translation.domain.model.WordTranslation

//Here any methods connected with manipulating data needed for Translation
interface TranslationWordsRemoteRepository {
    fun addAll(wordTranslations: List<WordTranslation>): Single<List<EntityIdentificator>>

    fun removeAllServerIds(serverIds: List<Int>): Completable

    fun pullWords(wordTranslations: List<Int>): Single<PullWordsAnswer>
}
