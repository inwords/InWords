package com.dreamproject.inwords.viewScenario.login;

import io.reactivex.Observable;

public interface LoginPresenter {
    void dispose();

    void logInHandler(Observable<Object> obs);
}
