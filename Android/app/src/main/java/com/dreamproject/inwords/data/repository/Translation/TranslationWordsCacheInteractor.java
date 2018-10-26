package com.dreamproject.inwords.data.repository.Translation;

import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;

public class TranslationWordsCacheInteractor implements TranslationWordsInteractor {
    private TranslationWordsLocalRepository inMemoryRepository;

    public TranslationWordsCacheInteractor(TranslationWordsLocalRepository inMemoryRepository) {
        this.inMemoryRepository = inMemoryRepository;
    }

    @Override
    public Observable<WordTranslation> getTranslation(String word) {
        return inMemoryRepository.getTranslation(word);
    }

    @Override
    public Observable<WordTranslation> getByOne() {
        return inMemoryRepository.getByOne();
    }

    @Override
    public Observable<List<WordTranslation>> getList() {
        return inMemoryRepository.getList();
    }

    @Override
    public Completable add(WordTranslation wordTranslation) {
        return inMemoryRepository.add(wordTranslation).ignoreElement();
    }

    @Override
    public Completable addAll(List<WordTranslation> wordTranslations) {
        return inMemoryRepository.addAll(wordTranslations).ignoreElement();
    }

    @Override
    public Completable markRemoved(WordTranslation wordTranslation) {
        markWordRemoved(wordTranslation);

        return inMemoryRepository.update(wordTranslation);
    }

    @Override
    public Completable markRemovedAll(List<WordTranslation> wordTranslations) {
        for (WordTranslation wordTranslation : wordTranslations)
            markWordRemoved(wordTranslation);

        return inMemoryRepository.updateAll(wordTranslations);
    }

    private void markWordRemoved(WordTranslation wordTranslation) {
        if (wordTranslation.getServerId() == 0)
            wordTranslation.markLocallyDeleted();
        else
            wordTranslation.markRemoteDeleted();
    }
}
