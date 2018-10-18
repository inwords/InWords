package com.dreamproject.inwords.viewScenario.Authorisation.Registration;

import io.reactivex.Observable;

public interface RegistrationPresenter {
    void onSignUpHandler(Observable<Object> obs);
    void onSignInHandler(Observable<Object> obs);
}
