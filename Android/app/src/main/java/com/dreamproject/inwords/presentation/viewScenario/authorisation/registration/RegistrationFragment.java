package com.dreamproject.inwords.presentation.viewScenario.authorisation.registration;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.TextInputEditText;
import android.view.View;
import android.widget.TextView;

import com.dreamproject.inwords.R;
import com.dreamproject.inwords.data.dto.UserCredentials;
import com.dreamproject.inwords.presentation.viewScenario.authorisation.SigningBaseFragment;
import com.jakewharton.rxbinding2.view.RxView;

import io.reactivex.Observable;

public class RegistrationFragment extends SigningBaseFragment<RegistrationViewModel, RegistrationViewModelFactory> {
    private TextInputEditText editTextConfirmPassword;

    public RegistrationFragment() {
        // Required empty public constructor
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        editTextConfirmPassword = view.findViewById(R.id.editTextConfirmPassword);

        TextView textViewSignIn = view.findViewById(R.id.textViewSignIn);

        viewModel.onNavigateHandler(RxView.clicks(textViewSignIn));
        viewModel.onSignHandler(RxView.clicks(buttonTrySign), getCredentials());
    }

    @Override
    protected Observable<UserCredentials> getCredentials() { //TODO show info
        return super.getCredentials().filter(userCredentials -> userCredentials.getPassword().equals(editTextConfirmPassword.getText().toString()));
    }

    @Override
    protected void navigateAction() {
        navigateToLogin();
    }

    @Override
    protected void navigateOnSuccess() {
        navController.navigate(R.id.action_registrationFragment_to_mainFragment_pop);
    }

    @Override
    protected int getButtonId() {
        return R.id.buttonEnterSignUp;
    }

    private void navigateToLogin() {
        navController.navigate(R.id.action_registrationFragment_to_loginFragment_pop);
    }

    @Override
    protected int getLayout() {
        return R.layout.fragment_sign_up;
    }

    @NonNull
    @Override
    protected Class<RegistrationViewModel> getClassType() {
        return RegistrationViewModel.class;
    }
}
