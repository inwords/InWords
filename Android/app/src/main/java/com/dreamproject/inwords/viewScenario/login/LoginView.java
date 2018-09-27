package com.dreamproject.inwords.viewScenario.login;

import com.dreamproject.inwords.data.source.WebService.UserCredentials;

import io.reactivex.Observable;

public interface LoginView {
    Observable<UserCredentials> getCredentials();
    void loginSuccess();
    void loginError();
}
