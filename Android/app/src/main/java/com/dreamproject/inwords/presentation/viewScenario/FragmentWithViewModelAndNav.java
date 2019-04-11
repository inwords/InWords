package com.dreamproject.inwords.presentation.viewScenario;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import javax.inject.Inject;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.lifecycle.ViewModel;
import androidx.lifecycle.ViewModelProvider;
import androidx.lifecycle.ViewModelProviders;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import dagger.android.support.DaggerFragment;
import io.reactivex.disposables.CompositeDisposable;

public abstract class FragmentWithViewModelAndNav
        <ViewModelType extends ViewModel, ViewModelFactory extends ViewModelProvider.Factory>
        extends DaggerFragment {

    protected ViewModelType viewModel;
    @Inject
    protected ViewModelFactory modelFactory;

    protected NavController navController;

    protected CompositeDisposable compositeDisposable = new CompositeDisposable();

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(getLayout(), container, false);
    }

    @Override
    public void onDestroyView() {
        compositeDisposable.clear();

        super.onDestroyView();
    }

    protected abstract int getLayout();

    @NonNull
    protected abstract Class<ViewModelType> getClassType();

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        navController = Navigation.findNavController(view);
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        viewModel = getViewModel();
    }

    protected ViewModelType getViewModel() {
        return ViewModelProviders.of(this, modelFactory).get(getClassType());
    }
}
