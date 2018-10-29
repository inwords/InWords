package com.dreamproject.inwords.viewScenario;

import android.arch.lifecycle.ViewModel;
import android.arch.lifecycle.ViewModelProvider;
import android.arch.lifecycle.ViewModelProviders;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import javax.inject.Inject;

import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import dagger.android.support.DaggerFragment;

public abstract class FragmentWithViewModelAndNav
        <ViewModelType extends ViewModel, ViewModelFactory extends ViewModelProvider.Factory>
        extends DaggerFragment {
    protected ViewModelType viewModel;
    @Inject
    ViewModelFactory modelFactory;

    protected NavController navController;

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(getLayout(), container, false);
    }

    protected abstract int getLayout();

    @NonNull
    protected abstract Class<ViewModelType> getClassType();

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        navController = Navigation.findNavController(view);
        viewModel = ViewModelProviders.of(this, modelFactory).get(getClassType());
    }
}
