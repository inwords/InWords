package com.dreamproject.inwords.viewScenario.Authorisation.login;

import android.app.Application;

import com.dreamproject.inwords.BasePresenter;
import com.dreamproject.inwords.BasicPresenter;

import io.reactivex.Observable;
import io.reactivex.disposables.Disposable;

//compositeDisposable, model and application are available from BasicPresenter
public class LoginPresenterImpl extends BasicPresenter implements LoginPresenter, BasePresenter {
    // Tag used for debugging/logging
    public static final String TAG = "LoginPresenterImpl";

    private LoginView loginView;

    public LoginPresenterImpl(Application application, LoginView loginView) {
        super(application);

        this.loginView = loginView;
    }

    @Override
    public void signUpHandler(Observable<Object> obs) {
        Disposable d = obs.doOnNext(o -> loginView.navigateToRegistration()).subscribe();

        compositeDisposable.add(d);
    }

    @Override
    public void signInHandler(Observable<Object> obs) {
        Disposable d = obs.switchMap((o) -> loginView.getCredentials())
                .subscribe(temporaryUser ->
                        compositeDisposable.add(model.signIn(temporaryUser)
                                .subscribe(loginView::loginSuccess,
                                        t -> {
                                            t.printStackTrace();
                                            loginView.loginError();
                                        }))
                );

        compositeDisposable.add(d);
    }

}