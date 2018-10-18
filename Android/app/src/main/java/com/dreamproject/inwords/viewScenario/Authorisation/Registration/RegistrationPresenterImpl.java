package com.dreamproject.inwords.viewScenario.Authorisation.Registration;

import android.app.Application;

import com.dreamproject.inwords.BasePresenter;
import com.dreamproject.inwords.BasicPresenter;

import java.util.concurrent.TimeUnit;

import io.reactivex.Observable;
import io.reactivex.disposables.Disposable;

//compositeDisposable, model and application are available from BasicPresenter
public class RegistrationPresenterImpl extends BasicPresenter implements RegistrationPresenter, BasePresenter {
    // Tag used for debugging/logging
    public static final String TAG = "RegistrationPresenterImpl";

    private RegistrationView registrationView;

    public RegistrationPresenterImpl(Application application, RegistrationView registrationView) {
        super(application);

        this.registrationView = registrationView;
    }

    @Override
    public void onSignUpHandler(Observable<Object> obs) {
        Disposable d = obs
                .debounce(200, TimeUnit.MILLISECONDS)
                .switchMap((o) -> registrationView.getCredentials())
                .subscribe(userCredentials ->
                        compositeDisposable.add(model.signUp(userCredentials)
                                .subscribe(registrationView::registrationSuccess,
                                        t -> {
                                            t.printStackTrace();
                                            registrationView.registrationError();
                                        }))
                );

        compositeDisposable.add(d);
    }

    @Override
    public void onSignInHandler(Observable<Object> obs) {
        Disposable d = obs.doOnNext(o -> registrationView.navigateToLogin()).subscribe();

        compositeDisposable.add(d);
    }

}