package ru.inwords.inwords.translation.data.repository

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.core.deferred_entry_manager.EntityIdentificator
import ru.inwords.inwords.translation.domain.model.Definition
import ru.inwords.inwords.translation.domain.model.LookupDirection
import ru.inwords.inwords.translation.domain.model.PullWordsAnswer
import ru.inwords.inwords.translation.domain.model.WordTranslation

//Here any methods connected with manipulating data needed for Translation
interface TranslationWordsRemoteRepository {
    fun insertAllWords(wordTranslations: List<WordTranslation>): Single<List<EntityIdentificator>>
    fun removeAllByServerId(serverIds: List<Int>): Completable
    fun pullWords(wordTranslations: List<Int>): Single<PullWordsAnswer>
    fun lookup(text: String, lookupDirection: LookupDirection): Single<List<Definition>>
    fun trainingWords(): Single<List<WordTranslation>>
    fun trainingIds(): Single<List<Int>>
}
