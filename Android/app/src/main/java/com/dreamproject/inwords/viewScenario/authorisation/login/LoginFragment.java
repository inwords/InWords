package com.dreamproject.inwords.viewScenario.authorisation.login;

import android.arch.lifecycle.ViewModelProviders;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.Snackbar;
import android.support.design.widget.TextInputEditText;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.dreamproject.inwords.R;
import com.dreamproject.inwords.data.entity.UserCredentials;
import com.jakewharton.rxbinding2.view.RxView;

import java.util.concurrent.TimeUnit;

import javax.inject.Inject;

import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import dagger.android.support.DaggerFragment;
import io.reactivex.Observable;

public class LoginFragment extends DaggerFragment {
    private LoginViewModel viewModel;
    @Inject
    LoginModelFactory modelFactory;

    public LoginFragment() {
        // Required empty public constructor
    }

    private void renderLoadingState() {
        //greetingTextView.setVisibility(View.GONE);
        //loadingIndicator.setVisibility(View.VISIBLE);
    }

    private void renderSuccessState() {
        navController.navigate(R.id.action_loginFragment_to_mainFragment_pop);

        View view = getView();
        if (view != null)
            Snackbar.make(view, "Sign in success", Snackbar.LENGTH_LONG).show();
    }

    private void renderErrorState(Throwable throwable) {
        View view = getView();
        if (view != null)
            Snackbar.make(view, "Sign in error", Snackbar.LENGTH_LONG).show();
    }

    public void navigateToRegistration() {
        navController.navigate(R.id.action_loginFragment_to_registrationFragment, null);
    }

    protected int getLayout() {
        return R.layout.fragment_sign_in;
    }



    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(getLayout(), container, false);
    }

    protected Button enterButtonSignIn;
    protected TextInputEditText editTextEmail;
    protected TextInputEditText editTextPassword;
    protected NavController navController;

    public Observable<UserCredentials> getCredentials() { //TODO: validate input
        return Observable.zip(
                Observable.fromCallable(() -> editTextEmail.getText().toString()),
                Observable.fromCallable(() -> editTextPassword.getText().toString()),
                UserCredentials::new);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        enterButtonSignIn = view.findViewById(R.id.buttonEnterSignIn);
        editTextEmail = view.findViewById(R.id.editTextEmail);
        editTextPassword = view.findViewById(R.id.editTextPassword);
        navController = Navigation.findNavController(view);

        ///
        viewModel = ViewModelProviders.of(this, modelFactory).get(LoginViewModel.class);

        TextView textViewSignUp = view.findViewById(R.id.textViewSignUp);

        Observable<Object> signInBtnObs = (RxView.clicks(enterButtonSignIn).debounce(200, TimeUnit.MILLISECONDS));
        Observable<Object> signUpBtnObs = (RxView.clicks(textViewSignUp).debounce(200, TimeUnit.MILLISECONDS));

        viewModel.onSignInHandler(signInBtnObs, getCredentials());
        viewModel.onSignUpHandler(signUpBtnObs);

        viewModel.getNavigateToRegistrationLiveData().observe(this, voidEvent -> {
            if (voidEvent != null && voidEvent.getContentIfNotHandled() != null) {
                navigateToRegistration();
            }
        });
        viewModel.getLoginStateLiveData().observe(this, this::processViewState);
    }

    private void processViewState(LoginViewState viewState) {
        switch (viewState.status) {
            case LOADING:
                renderLoadingState();
                break;

            case SUCCESS:
                renderSuccessState();
                break;

            case ERROR:
                renderErrorState(viewState.throwable);
                break;
        }
    }
}
