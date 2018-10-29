package com.dreamproject.inwords.viewScenario.main;

import android.arch.lifecycle.ViewModel;
import android.arch.lifecycle.ViewModelProvider;
import android.content.Context;
import android.support.annotation.NonNull;

import com.dreamproject.inwords.viewScenario.authorisation.login.LoginViewModel;

import javax.inject.Inject;

public class MainViewModelFactory implements ViewModelProvider.Factory {
    private final Context context;

    @Inject
    MainViewModelFactory(Context context) {
        this.context = context;
    }

    @NonNull
    @Override
    public <T extends ViewModel> T create(@NonNull Class<T> modelClass) {
        if (modelClass.isAssignableFrom(MainViewModel.class)) {
            return (T) new MainViewModel(context);
        }
        throw new IllegalArgumentException("Unknown ViewModel class");
    }

}
