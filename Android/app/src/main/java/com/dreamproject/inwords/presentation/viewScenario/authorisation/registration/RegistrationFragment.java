package com.dreamproject.inwords.presentation.viewScenario.authorisation.registration;

import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.dreamproject.inwords.R;
import com.dreamproject.inwords.data.dto.UserCredentials;
import com.dreamproject.inwords.presentation.viewScenario.authorisation.AuthorisationViewModelFactory;
import com.dreamproject.inwords.presentation.viewScenario.authorisation.SigningBaseFragment;
import com.google.android.material.textfield.TextInputEditText;
import com.jakewharton.rxbinding2.view.RxView;

import io.reactivex.Observable;

public class RegistrationFragment extends SigningBaseFragment<RegistrationViewModel, AuthorisationViewModelFactory> {
    private TextInputEditText editTextConfirmPassword;

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
