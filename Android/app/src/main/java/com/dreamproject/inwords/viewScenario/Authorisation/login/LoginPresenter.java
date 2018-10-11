package com.dreamproject.inwords.viewScenario.Authorisation.login;

import io.reactivex.Observable;

public interface LoginPresenter {

    void signUpHandler(Observable<Object> obs);

    void signInHandler(Observable<Object> obs);
}
