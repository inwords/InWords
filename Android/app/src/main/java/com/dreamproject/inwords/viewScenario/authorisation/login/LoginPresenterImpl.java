package com.dreamproject.inwords.viewScenario.authorisation.login;

import com.dreamproject.inwords.BasePresenter;
import com.dreamproject.inwords.BasicModelPresenter;
import com.dreamproject.inwords.model.authorisation.AuthorisationInteractor;
import com.dreamproject.inwords.util.DependenciesComponent;

import io.reactivex.Observable;
import io.reactivex.disposables.Disposable;

//compositeDisposable, model and application are available from BasicPresenter
public class LoginPresenterImpl extends BasicModelPresenter<AuthorisationInteractor> implements LoginPresenter, BasePresenter {
    // Tag used for debugging/logging
    public static final String TAG = "LoginPresenterImpl";

    private LoginView loginView;

    public LoginPresenterImpl(LoginView loginView) {
        super(DependenciesComponent.getAuthorisationInteractorInstance());

        this.loginView = loginView;
    }

    @Override
    public void onSignUpHandler(Observable<Object> obs) {
        Disposable d = obs.doOnNext(o -> loginView.navigateToRegistration()).subscribe();

        compositeDisposable.add(d);
    }

    @Override
    public void onSignInHandler(Observable<Object> obs) {
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