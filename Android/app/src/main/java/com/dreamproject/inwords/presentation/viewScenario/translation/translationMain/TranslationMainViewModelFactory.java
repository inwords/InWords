package com.dreamproject.inwords.presentation.viewScenario.translation.translationMain;

import com.dreamproject.inwords.domain.interactor.translation.TranslationSyncInteractor;
import com.dreamproject.inwords.domain.interactor.translation.TranslationWordsInteractor;

import javax.inject.Inject;
import javax.inject.Singleton;

import androidx.annotation.NonNull;
import androidx.lifecycle.ViewModel;
import androidx.lifecycle.ViewModelProvider;

@Singleton
public class TranslationMainViewModelFactory implements ViewModelProvider.Factory {
    private final TranslationWordsInteractor translationWordsInteractor;
    private final TranslationSyncInteractor translationSyncInteractor;

    @Inject
    TranslationMainViewModelFactory(TranslationWordsInteractor translationWordsInteractor,
                                    TranslationSyncInteractor translationSyncInteractor) {
        this.translationWordsInteractor = translationWordsInteractor;
        this.translationSyncInteractor = translationSyncInteractor;
    }

    @NonNull
    @Override
    public <T extends ViewModel> T create(@NonNull Class<T> modelClass) {
        if (modelClass.isAssignableFrom(TranslationMainViewModel.class)) {
            //noinspection unchecked
            return (T) new TranslationMainViewModel(translationWordsInteractor, translationSyncInteractor);
        }
        throw new IllegalArgumentException("Unknown ViewModel class");
    }

}
