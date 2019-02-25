package com.dreamproject.inwords;

import android.app.Application;

import com.dreamproject.inwords.dagger.AppComponent;
import com.dreamproject.inwords.dagger.DaggerAppComponent;

import javax.inject.Inject;

import androidx.fragment.app.Fragment;
import dagger.android.AndroidInjector;
import dagger.android.DispatchingAndroidInjector;
import dagger.android.support.HasSupportFragmentInjector;

public class App extends Application implements HasSupportFragmentInjector {
    public static AppComponent appComponent;
    
    @Inject
    DispatchingAndroidInjector<Fragment> dispatchingActivityInjector;
    @Inject
    AppComponent _appComponent;

    @Override
    public void onCreate() {
        super.onCreate();
        DaggerAppComponent.builder().create(this).inject(this);

        appComponent = _appComponent;
    }

    @Override
    public AndroidInjector<Fragment> supportFragmentInjector() {
        return dispatchingActivityInjector;
    }
}
