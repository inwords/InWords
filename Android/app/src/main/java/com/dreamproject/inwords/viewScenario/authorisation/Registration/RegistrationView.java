package com.dreamproject.inwords.viewScenario.authorisation.Registration;

import com.dreamproject.inwords.data.entity.UserCredentials;

import io.reactivex.Observable;

public interface RegistrationView {
    Observable<UserCredentials> getCredentials();
    void navigateToLogin();
    void registrationSuccess();
    void registrationError(String message);
}
