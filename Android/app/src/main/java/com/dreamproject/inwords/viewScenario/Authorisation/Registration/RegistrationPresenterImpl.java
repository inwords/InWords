package com.dreamproject.inwords.viewScenario.Authorisation.Registration;

import android.app.Application;

import com.dreamproject.inwords.BasicPresenter;

import io.reactivex.Observable;
import io.reactivex.disposables.Disposable;

//compositeDisposable, model and application are available from BasicPresenter
public class RegistrationPresenterImpl extends BasicPresenter implements RegistrationPresenter {
    // Tag used for debugging/logging
    public static final String TAG = "RegistrationPresenterImpl";

    private RegistrationView registrationView;

    public RegistrationPresenterImpl(Application application, RegistrationView registrationView) {
        super(application);

        this.registrationView = registrationView;
    }

    @Override
    public void signUpHandler(Observable<Object> obs) {
        Disposable d = obs.switchMap((o) -> registrationView.getCredentials())
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

}