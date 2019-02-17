package com.dreamproject.inwords.data.interactor.translation;

import com.dreamproject.inwords.dagger.annotations.CacheRepository;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.repository.translation.TranslationWordsLocalRepository;

import java.util.List;

import javax.inject.Inject;

import io.reactivex.Completable;
import io.reactivex.Observable;

public class TranslationWordsCacheInteractor implements TranslationWordsRepositoryInteractor {
    private TranslationWordsLocalRepository inMemoryRepository;

    @Inject
    TranslationWordsCacheInteractor(@CacheRepository TranslationWordsLocalRepository inMemoryRepository) {
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
        return inMemoryRepository.addReplace(wordTranslation).ignoreElement();
    }

    @Override
    public Completable addAll(List<WordTranslation> wordTranslations) {
        return inMemoryRepository.addReplaceAll(wordTranslations).ignoreElement();
    }

    @Override
    public Completable markRemoved(WordTranslation wordTranslation) {
        WordTranslation wordTranslationCl = wordTranslation.clone();
        markWordRemoved(wordTranslationCl);

        return add(wordTranslationCl);
    }

    @Override
    public Completable markRemovedAll(List<WordTranslation> wordTranslations) {
        for (WordTranslation wordTranslation : wordTranslations)
            markWordRemoved(wordTranslation);

        return addAll(wordTranslations);
    }

    private void markWordRemoved(WordTranslation wordTranslation) {
        if (wordTranslation.getServerId() == 0)
            wordTranslation.markLocallyDeleted();
        else
            wordTranslation.markRemoteDeleted();
    }
}
