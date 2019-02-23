package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevel;

import com.dreamproject.inwords.data.repository.GameRepository;

import javax.inject.Inject;
import javax.inject.Singleton;

import androidx.annotation.NonNull;
import androidx.lifecycle.ViewModel;
import androidx.lifecycle.ViewModelProvider;

@Singleton
public class GameLevelViewModelFactory implements ViewModelProvider.Factory {
    private final GameRepository gameRepository;

    @Inject
    GameLevelViewModelFactory(final GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @NonNull
    @Override
    public <T extends ViewModel> T create(@NonNull Class<T> modelClass) {
        if (modelClass.isAssignableFrom(GameLevelViewModel.class)) {
            //noinspection unchecked
            return (T) new GameLevelViewModel(gameRepository);
        }
        throw new IllegalArgumentException("Unknown ViewModel class");
    }

}
