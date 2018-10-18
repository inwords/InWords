package com.dreamproject.inwords.viewScenario.authorisation.Registration;

import com.dreamproject.inwords.BasePresenter;
import com.dreamproject.inwords.BasicModelPresenter;
import com.dreamproject.inwords.model.authorisation.AuthorisationInteractor;
import com.dreamproject.inwords.util.DependenciesComponent;

import java.util.concurrent.TimeUnit;

import io.reactivex.Observable;
import io.reactivex.disposables.Disposable;

//compositeDisposable, model and application are available from BasicPresenter
public class RegistrationPresenterImpl extends BasicModelPresenter<AuthorisationInteractor> implements RegistrationPresenter, BasePresenter {
    // Tag used for debugging/logging
    public static final String TAG = "RegistrationPresenterImpl";

    private RegistrationView registrationView;

    public RegistrationPresenterImpl(RegistrationView registrationView) {
        super(DependenciesComponent.getAuthorisationInteractorInstance());

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
                                            registrationView.registrationError(t.getMessage());
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