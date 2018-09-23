package com.dreamproject.inwords.viewScenario.login;

import android.app.Application;

import com.dreamproject.inwords.BasicPresenter;

import io.reactivex.Observable;
import io.reactivex.disposables.Disposable;

//compositeDisposable, model and application are available from BasicPresenter
public class LoginPresenterImpl extends BasicPresenter implements LoginPresenter {
    // Tag used for debugging/logging
    public static final String TAG = "LoginPresenterImpl";

    private LoginView loginView;

    public LoginPresenterImpl(Application application, LoginView loginView) {
        super(application);

        this.loginView = loginView;
    }

    @Override
    public void logInHandler(Observable<Object> obs) {
        Disposable d = obs.switchMap((o) -> loginView.getCredentials())
                .subscribe(temporaryUser -> model.logIn(temporaryUser)
                        .subscribe(loginView::loginSuccess,
                                t -> {
                                    t.printStackTrace();
                                    loginView.loginError();
                                })
                );

        compositeDisposable.add(d);
    }

}