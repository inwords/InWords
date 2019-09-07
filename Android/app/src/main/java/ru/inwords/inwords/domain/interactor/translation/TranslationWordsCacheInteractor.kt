package ru.inwords.inwords.domain.interactor.translation

import io.reactivex.Completable
import io.reactivex.Observable
import ru.inwords.inwords.dagger.annotations.CacheRepository
import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.data.repository.translation.TranslationWordsLocalRepository
import javax.inject.Inject

class TranslationWordsCacheInteractor @Inject
internal constructor(@CacheRepository private val inMemoryRepository: TranslationWordsLocalRepository) : TranslationWordsRepositoryInteractor {
    override fun getByOne(): Observable<WordTranslation> = inMemoryRepository.getByOne()

    override fun getList() = inMemoryRepository.getList()

    override fun add(wordTranslation: WordTranslation): Completable {
        return inMemoryRepository.addReplace(wordTranslation).ignoreElement()
    }

    override fun addAll(wordTranslations: List<WordTranslation>): Completable {
        return inMemoryRepository.addReplaceAll(wordTranslations).ignoreElement()
    }

    override fun markRemoved(wordTranslation: WordTranslation): Completable {
        wordTranslation.markRemoved()

        return add(wordTranslation)
    }

    override fun markRemovedAll(wordTranslations: List<WordTranslation>): Completable {
        for (wordTranslation in wordTranslations) {
            wordTranslation.markRemoved()
        }

        return addAll(wordTranslations)
    }

    override fun clearCache() = inMemoryRepository.clear()

    private fun WordTranslation.markRemoved() {
        if (serverId == 0) {
            markLocallyDeleted()
        } else {
            markRemoteDeleted()
        }
    }
}
