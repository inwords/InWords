package ru.inwords.inwords.domain.interactor.translation

import io.reactivex.Completable
import io.reactivex.Observable
import ru.inwords.inwords.data.dto.WordTranslation
import javax.inject.Inject

class TranslationWordsInteractorImpl @Inject
internal constructor(private val repositoryInteractor: TranslationWordsRepositoryInteractor) : TranslationWordsInteractor {
    private val wordsStream: Observable<List<WordTranslation>>

    init {
        this.wordsStream = repositoryInteractor.getList()
                .map { list -> list.filter { it.serverId >= 0 } }
                .share()
                .replay(1)
                .autoConnect()
    }

    override fun addReplace(wordTranslation: WordTranslation): Completable {
        return repositoryInteractor.add(wordTranslation)
    }

    override fun remove(wordTranslation: WordTranslation): Completable {
        return repositoryInteractor.markRemoved(wordTranslation)
    }

    override fun update(oldWord: WordTranslation, newWord: WordTranslation): Completable {
        return Completable.concatArray(remove(oldWord), addReplace(newWord))
    }

    override fun getAllWords(): Observable<List<WordTranslation>> {
        return wordsStream
    }

    override fun clearCache() {
        repositoryInteractor.clearCache()
    }

    companion object {
        // Tag used for debugging/logging
        const val TAG = "TranslationWordsInteractorImpl"
    }
}
