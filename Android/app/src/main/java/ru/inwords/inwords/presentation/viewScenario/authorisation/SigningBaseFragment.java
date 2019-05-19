package ru.inwords.inwords.presentation.viewScenario.authorisation;

import android.os.Bundle;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.lifecycle.ViewModelProvider;

import com.google.android.material.textfield.TextInputEditText;

import io.reactivex.Observable;
import ru.inwords.inwords.R;
import ru.inwords.inwords.core.util.Event;
import ru.inwords.inwords.data.dto.UserCredentials;
import ru.inwords.inwords.presentation.custom_views.button.ActionProcessButton;
import ru.inwords.inwords.presentation.viewScenario.FragmentWithViewModelAndNav;

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

    protected void renderLoadingState() {
        buttonTrySign.setProgress(50);
    }

    private void renderSuccessState() {
        buttonTrySign.setProgress(100);

        navigateOnSuccess();
    }

    private void renderErrorState(Throwable throwable) {
        buttonTrySign.setErrorText("Попробуйте ещё раз\nОшибка: " + throwable.getLocalizedMessage());
        buttonTrySign.setProgress(-1);
    }

    private void processViewState(Event<AuthorisationViewState> viewStateEvent) {
        editTextEmail.setError(null);
        editTextPassword.setError(null);

        AuthorisationViewState authorisationViewState = viewStateEvent.peekContent();
        switch (authorisationViewState.status) {
            case LOADING:
                renderLoadingState();
                break;

            case SUCCESS:
                renderSuccessState();
                break;

            case ERROR:
                AuthorisationViewState viewState = viewStateEvent.getContentIfNotHandled();
                if (viewState != null && viewState.throwable != null) {
                    renderErrorState(viewState.throwable);
                }
                break;

            case INVALID_EMAIL:
                editTextEmail.setError(authorisationViewState.invalidEmailMessage);
                buttonTrySign.setProgress(-1);
                break;

            case INVALID_PASSWORD:
                editTextPassword.setError(authorisationViewState.invalidPasswordMessage);
                buttonTrySign.setProgress(-1);
                break;

            case INVALID_INPUT:
                editTextEmail.setError(authorisationViewState.invalidEmailMessage);
                editTextPassword.setError(authorisationViewState.invalidPasswordMessage);
                buttonTrySign.setProgress(-1);
                break;
        }
    }
}
