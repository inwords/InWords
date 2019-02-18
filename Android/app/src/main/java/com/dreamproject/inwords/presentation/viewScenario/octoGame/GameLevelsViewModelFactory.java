package com.dreamproject.inwords.presentation.viewScenario.octoGame;

import android.arch.lifecycle.ViewModel;
import android.arch.lifecycle.ViewModelProvider;
import android.support.annotation.NonNull;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class GameLevelsViewModelFactory implements ViewModelProvider.Factory {
    @Inject
    GameLevelsViewModelFactory() {
    }

    @NonNull
    @Override
    public <T extends ViewModel> T create(@NonNull Class<T> modelClass) {
        if (modelClass.isAssignableFrom(GameLevelsViewModel.class)) {
            //noinspection unchecked
            return (T) new GameLevelsViewModel();
        }
        throw new IllegalArgumentException("Unknown ViewModel class");
    }

}
