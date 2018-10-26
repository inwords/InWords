package com.dreamproject.inwords.viewScenario.Authorisation;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.TextInputEditText;
import android.view.View;
import android.widget.Button;

import com.dreamproject.inwords.R;
import com.dreamproject.inwords.data.entity.UserCredentials;
import com.dreamproject.inwords.viewScenario.PresenterNavFragment;

import io.reactivex.Observable;

public abstract class SigningBaseFragment extends PresenterNavFragment {
    protected Button enterButtonSignIn;
    protected TextInputEditText editTextEmail;
    protected TextInputEditText editTextPassword;

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
    }
}
