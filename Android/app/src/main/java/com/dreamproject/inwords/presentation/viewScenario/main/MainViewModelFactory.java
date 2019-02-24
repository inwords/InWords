package com.dreamproject.inwords.presentation.viewScenario.main;

import com.dreamproject.inwords.domain.interactor.translation.TranslationSyncInteractor;
import com.dreamproject.inwords.domain.interactor.translation.TranslationWordsInteractor;

import javax.inject.Inject;

import androidx.annotation.NonNull;
import androidx.lifecycle.ViewModel;
import androidx.lifecycle.ViewModelProvider;

public class MainViewModelFactory implements ViewModelProvider.Factory {
    private final TranslationWordsInteractor translationWordsInteractor;
    private final TranslationSyncInteractor translationSyncInteractor;

    @Inject
    MainViewModelFactory(TranslationWordsInteractor translationWordsInteractor,
                         TranslationSyncInteractor translationSyncInteractor) {
        this.translationWordsInteractor = translationWordsInteractor;
        this.translationSyncInteractor = translationSyncInteractor;
    }

    @NonNull
    @Override
    public <T extends ViewModel> T create(@NonNull Class<T> modelClass) {
        if (modelClass.isAssignableFrom(MainViewModel.class)) {
            //noinspection unchecked
            return (T) new MainViewModel(translationWordsInteractor, translationSyncInteractor);
        }
        throw new IllegalArgumentException("Unknown ViewModel class");
    }

}
