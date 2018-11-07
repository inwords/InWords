package com.dreamproject.inwords.viewScenario.authorisation;

import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.MutableLiveData;

import com.dreamproject.inwords.BasicViewModel;
import com.dreamproject.inwords.Event;
import com.dreamproject.inwords.data.entity.UserCredentials;
import com.dreamproject.inwords.data.interactor.authorisation.AuthorisationInteractor;

import java.util.concurrent.TimeUnit;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.disposables.Disposable;

public abstract class AuthorisationViewModel extends BasicViewModel {
    private final MutableLiveData<Event<AuthorisationViewState>> authorisationStateLiveData;
    private final MutableLiveData<Event<Boolean>> navigateToLiveData;

    protected AuthorisationInteractor authorisationInteractor;

    protected AuthorisationViewModel(AuthorisationInteractor authorisationInteractor) {
        authorisationStateLiveData = new MutableLiveData<>();
        navigateToLiveData = new MutableLiveData<>();

        this.authorisationInteractor = authorisationInteractor;
    }

    public LiveData<Event<AuthorisationViewState>> getAuthorisationStateLiveData() {
        return authorisationStateLiveData;
    }

    public LiveData<Event<Boolean>> getNavigateToLiveData() {
        return navigateToLiveData;
    }

    public void onNavigateHandler(Observable<Object> clicksObservable) {
        Disposable d = clicksObservable
                .debounce(200, TimeUnit.MILLISECONDS)
                .subscribe(__ -> navigateToLiveData.postValue(new Event<>(true)));
        compositeDisposable.add(d);
    }

    public void onSignHandler(Observable<Object> clicksObservable, Observable<UserCredentials> userCredentialsObservable) {
        Disposable d = clicksObservable
                .debounce(200, TimeUnit.MILLISECONDS)
                .doOnNext(__ -> authorisationStateLiveData.postValue(new Event<>(AuthorisationViewState.loading())))
                .switchMap(__ -> userCredentialsObservable)
                .subscribe(userCredentials ->
                        compositeDisposable.add(performAuthAction(userCredentials)
                                .subscribe(() -> authorisationStateLiveData.postValue(new Event<>(AuthorisationViewState.success())),
                                        t -> authorisationStateLiveData.postValue(new Event<>(AuthorisationViewState.error(t)))))
                );

        compositeDisposable.add(d);
    }

    protected abstract Completable performAuthAction(UserCredentials userCredentials);
}