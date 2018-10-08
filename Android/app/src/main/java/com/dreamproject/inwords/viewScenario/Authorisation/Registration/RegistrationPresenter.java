package com.dreamproject.inwords.viewScenario.Authorisation.Registration;

import io.reactivex.Observable;

public interface RegistrationPresenter {
    void dispose();

    void signUpHandler(Observable<Object> obs);
}
