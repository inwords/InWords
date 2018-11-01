package com.dreamproject.inwords.viewScenario.translation.translationMain;

import android.arch.lifecycle.ViewModel;
import android.arch.lifecycle.ViewModelProvider;
import android.support.annotation.NonNull;

import com.dreamproject.inwords.data.interactor.translation.TranslationSyncInteractor;
import com.dreamproject.inwords.data.interactor.translation.TranslationWordsInteractor;

import javax.inject.Inject;
import javax.inject.Singleton;

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
