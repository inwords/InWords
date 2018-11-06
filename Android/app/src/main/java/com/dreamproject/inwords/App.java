package com.dreamproject.inwords;

import android.app.Application;
import android.support.v4.app.Fragment;

import com.dreamproject.inwords.dagger.DaggerAppComponent;
import com.dreamproject.inwords.data.source.WebService.WebRequests;
import com.dreamproject.inwords.data.interactor.authorisation.AuthorisationInteractor;

import javax.inject.Inject;

import dagger.android.AndroidInjector;
import dagger.android.DispatchingAndroidInjector;
import dagger.android.support.HasSupportFragmentInjector;

public class App extends Application implements HasSupportFragmentInjector {
    @Inject DispatchingAndroidInjector<Fragment> dispatchingActivityInjector;

    static public WebRequests webRequests;
    static public AuthorisationInteractor authorisationInteractor;
    @Inject
    WebRequests webRequestss;
    @Inject
    AuthorisationInteractor authorisationInteractorr;

    @Override
    public void onCreate() {
        super.onCreate();
        DaggerAppComponent.builder().create(this).inject(this);

        webRequests = webRequestss;
        authorisationInteractor = authorisationInteractorr;
    }


    @Override
    public AndroidInjector<Fragment> supportFragmentInjector() {
        return dispatchingActivityInjector;
    }
}
