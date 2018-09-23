package com.dreamproject.inwords.viewScenario.login;

import com.dreamproject.inwords.data.source.WebService.TemporaryUser;

import io.reactivex.Observable;

public interface LoginView {
    Observable<TemporaryUser> getCredentials();
    void loginSuccess();
    void loginError();
}
