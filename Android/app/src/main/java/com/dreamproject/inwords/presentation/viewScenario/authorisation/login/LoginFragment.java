package com.dreamproject.inwords.presentation.viewScenario.authorisation.login;

import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import com.dreamproject.inwords.R;
import com.dreamproject.inwords.presentation.viewScenario.authorisation.SigningBaseFragment;
import com.jakewharton.rxbinding2.view.RxView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class LoginFragment extends SigningBaseFragment<LoginViewModel, LoginViewModelFactory> {
    public LoginFragment() {
        // Required empty public constructor
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        TextView textViewSignUp = view.findViewById(R.id.textViewSignUp);

        viewModel.onSignHandler(RxView.clicks(buttonTrySign), getCredentials());
        viewModel.onNavigateHandler(RxView.clicks(textViewSignUp));
    }

    @Override
    protected void navigateAction() {
        navigateToRegistration();
    }

    @Override
    protected void navigateOnSuccess() {
        navController.navigate(R.id.action_loginFragment_to_mainFragment_pop);
    }

    @Override
    protected int getButtonId() {
        return R.id.buttonEnterSignIn;
    }

    private void navigateToRegistration() {
        navController.navigate(R.id.action_loginFragment_to_registrationFragment);
    }

    @Override
    protected int getLayout() {
        return R.layout.fragment_sign_in;
    }

    @NonNull
    @Override
    protected Class<LoginViewModel> getClassType() {
        return LoginViewModel.class;
    }

}
