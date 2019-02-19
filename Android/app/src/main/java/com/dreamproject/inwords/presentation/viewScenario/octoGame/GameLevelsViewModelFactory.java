package com.dreamproject.inwords.presentation.viewScenario.octoGame;

import javax.inject.Inject;
import javax.inject.Singleton;

import androidx.annotation.NonNull;
import androidx.lifecycle.ViewModel;
import androidx.lifecycle.ViewModelProvider;

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
