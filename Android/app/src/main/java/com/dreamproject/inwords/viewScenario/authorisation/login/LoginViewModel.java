package com.dreamproject.inwords.viewScenario.authorisation.login;

import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.MutableLiveData;
import android.arch.lifecycle.ViewModel;

import com.dreamproject.inwords.Event;
import com.dreamproject.inwords.data.entity.UserCredentials;
import com.dreamproject.inwords.model.authorisation.AuthorisationInteractor;
import com.dreamproject.inwords.util.DependenciesComponent;

import io.reactivex.Observable;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.disposables.Disposable;

public class LoginViewModel extends ViewModel {
    private final MutableLiveData<LoginViewState> loginStateLiveData;
    private final MutableLiveData<Event<Void>> navigateToRegistrationLiveData;

    private AuthorisationInteractor authorisationInteractor;
    private CompositeDisposable compositeDisposable;

    LoginViewModel(AuthorisationInteractor authorisationInteractor) {
        loginStateLiveData = new MutableLiveData<>();
        navigateToRegistrationLiveData = new MutableLiveData<>();

        compositeDisposable = new CompositeDisposable();
        this.authorisationInteractor = DependenciesComponent.getAuthorisationInteractorInstance();
    }

    LiveData<LoginViewState> getLoginStateLiveData() {
        return loginStateLiveData;
    }

    LiveData<Event<Void>> getNavigateToRegistrationLiveData() {
        return navigateToRegistrationLiveData;
    }

    public void onSignUpHandler(Observable<Object> clicksObservable) {
        Disposable d = clicksObservable.subscribe(__ -> navigateToRegistrationLiveData.setValue(new Event<>(null)));
        compositeDisposable.add(d);
    }

    public void onSignInHandler(Observable<Object> clicksObservable, Observable<UserCredentials> userCredentialsObservable) {
        Disposable d = clicksObservable
                .doOnSubscribe(__ -> loginStateLiveData.setValue(LoginViewState.loading()))
                .switchMap(__ -> userCredentialsObservable)
                .subscribe(userCredentials ->
                        compositeDisposable.add(authorisationInteractor.signIn(userCredentials)
                                .subscribe(() -> loginStateLiveData.setValue(LoginViewState.success()),
                                        t -> {
                                            t.printStackTrace();
                                            loginStateLiveData.setValue(LoginViewState.error(t));
                                        }))
                );

        compositeDisposable.add(d);
    }

    @Override
    protected void onCleared() {
        compositeDisposable.dispose();
        compositeDisposable.clear();
    }
}
