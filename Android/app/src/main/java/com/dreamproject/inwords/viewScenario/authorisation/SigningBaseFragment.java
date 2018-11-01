package com.dreamproject.inwords.viewScenario.authorisation;

import android.arch.lifecycle.ViewModelProvider;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.Snackbar;
import android.support.design.widget.TextInputEditText;
import android.view.View;

import com.dreamproject.inwords.Event;
import com.dreamproject.inwords.R;
import com.dreamproject.inwords.button.iml.ActionProcessButton;
import com.dreamproject.inwords.data.entity.UserCredentials;
import com.dreamproject.inwords.viewScenario.FragmentWithViewModelAndNav;

import io.reactivex.Observable;

public abstract class SigningBaseFragment
        <ViewModelType extends AuthorisationViewModel, ViewModelFactory extends ViewModelProvider.Factory>
        extends FragmentWithViewModelAndNav<ViewModelType, ViewModelFactory> {
    protected TextInputEditText editTextEmail;
    protected TextInputEditText editTextPassword;
    protected ActionProcessButton buttonTrySign;

    protected Observable<UserCredentials> getCredentials() { //TODO: validate input
        return Observable.zip(
                Observable.fromCallable(() -> editTextEmail.getText().toString()),
                Observable.fromCallable(() -> editTextPassword.getText().toString()),
                UserCredentials::new);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        editTextEmail = view.findViewById(R.id.editTextEmail);
        editTextPassword = view.findViewById(R.id.editTextPassword);
        buttonTrySign = view.findViewById(getButtonId());
        buttonTrySign.setMode(ActionProcessButton.Mode.ENDLESS);

        viewModel.getNavigateToLiveData().observe(this, event -> {
            if (event != null && event.getContentIfNotHandled() != null) {
                navigateAction();
            }
        });
        viewModel.getAuthorisationStateLiveData().observe(this, this::processViewState);
    }

    protected abstract void navigateAction();

    protected abstract void navigateOnSuccess();

    protected abstract int getButtonId();

    protected void renderLoadingState(){
        buttonTrySign.setProgress(50);
    }

    private void renderSuccessState() {
        buttonTrySign.setProgress(100);

        navigateOnSuccess();

        View view = getView();
        if (view != null)
            Snackbar.make(view, "Sign success", Snackbar.LENGTH_LONG).show();
    }

    private void renderErrorState(Throwable throwable) {
        buttonTrySign.setProgress(0);
        buttonTrySign.setError("Ошибка авторизации");

        View view = getView();
        if (view != null)
            Snackbar.make(view, "Sign error: " + throwable.getLocalizedMessage(), Snackbar.LENGTH_LONG).show();
    }

    private void processViewState(Event<AuthorisationViewState> viewStateEvent) {
        switch (viewStateEvent.peekContent().status) {
            case LOADING:
                renderLoadingState();
                break;

            case SUCCESS:
                renderSuccessState();
                break;

            case ERROR:
                AuthorisationViewState viewState = viewStateEvent.getContentIfNotHandled();
                if (viewState != null && viewState.throwable != null)
                    renderErrorState(viewState.throwable);
                break;
        }
    }
}
