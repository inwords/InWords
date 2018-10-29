package com.dreamproject.inwords.viewScenario.translation;

import android.arch.lifecycle.ViewModel;
import android.arch.lifecycle.ViewModelProvider;
import android.content.Context;
import android.support.annotation.NonNull;

import javax.inject.Inject;

public class TranslationViewModelFactory implements ViewModelProvider.Factory {
    private final Context context;

    @Inject
    TranslationViewModelFactory(Context context) {
        this.context = context;
    }

    @NonNull
    @Override
    public <T extends ViewModel> T create(@NonNull Class<T> modelClass) {
        if (modelClass.isAssignableFrom(TranslationViewModel.class)) {
            return (T) new TranslationViewModel(context);
        }
        throw new IllegalArgumentException("Unknown ViewModel class");
    }

}
