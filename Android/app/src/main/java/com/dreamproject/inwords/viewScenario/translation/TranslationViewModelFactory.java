package com.dreamproject.inwords.viewScenario.translation;

import android.arch.lifecycle.ViewModel;
import android.arch.lifecycle.ViewModelProvider;
import android.support.annotation.NonNull;

import com.dreamproject.inwords.data.interactor.translation.TranslationSyncInteractor;
import com.dreamproject.inwords.data.interactor.translation.TranslationWordsInteractor;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class TranslationViewModelFactory implements ViewModelProvider.Factory {
    private final TranslationWordsInteractor translationWordsInteractor;
    private final TranslationSyncInteractor translationSyncInteractor;

    @Inject
    TranslationViewModelFactory(TranslationWordsInteractor translationWordsInteractor,
                                TranslationSyncInteractor translationSyncInteractor) {
        this.translationWordsInteractor = translationWordsInteractor;
        this.translationSyncInteractor = translationSyncInteractor;
    }

    @NonNull
    @Override
    public <T extends ViewModel> T create(@NonNull Class<T> modelClass) {
        if (modelClass.isAssignableFrom(TranslationViewModel.class)) {
            //noinspection unchecked
            return (T) new TranslationViewModel(translationWordsInteractor, translationSyncInteractor);
        }
        throw new IllegalArgumentException("Unknown ViewModel class");
    }

}
