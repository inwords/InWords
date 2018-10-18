package com.dreamproject.inwords.viewScenario.authorisation.login;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.Snackbar;
import android.view.View;
import android.widget.TextView;

import com.dreamproject.inwords.BasePresenter;
import com.dreamproject.inwords.R;
import com.dreamproject.inwords.viewScenario.authorisation.SigningBaseFragment;
import com.jakewharton.rxbinding2.view.RxView;

import java.util.concurrent.TimeUnit;

import io.reactivex.Observable;

public class LoginFragment extends SigningBaseFragment implements LoginView {
    private LoginPresenter presenter;

    private TextView textViewSignUp;

    public LoginFragment() {
        // Required empty public constructor
    }

    @Override
    public void loginSuccess() {
        navController.navigate(R.id.action_loginFragment_to_mainFragment_pop);

        View view = getView();
        if (view != null)
            Snackbar.make(view, "Sign in success", Snackbar.LENGTH_LONG).show();
    }

    @Override
    public void loginError() {
        View view = getView();
        if (view != null)
            Snackbar.make(view, "Sign in error", Snackbar.LENGTH_LONG).show();
    }

    @Override
    public void navigateToRegistration() {
        navController.navigate(R.id.action_loginFragment_to_registrationFragment, null);
    }

    @Override
    protected int getLayout() {
        return R.layout.fragment_sign_in;
    }

    @Override
    protected BasePresenter getPresenter() {
        return (BasePresenter) (presenter = new LoginPresenterImpl(this));
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        textViewSignUp = view.findViewById(R.id.textViewSignUp);

        Observable<Object> signInBtnObs = (RxView.clicks(enterButtonSignIn).debounce(200, TimeUnit.MILLISECONDS));
        Observable<Object> signUpTxtVwObs = (RxView.clicks(textViewSignUp).debounce(200, TimeUnit.MILLISECONDS));

        presenter.onSignInHandler(signInBtnObs);
        presenter.onSignUpHandler(signUpTxtVwObs);
    }
}
