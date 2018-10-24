package com.dreamproject.inwords.dagger;

import com.dreamproject.inwords.App;

import javax.inject.Singleton;

import dagger.Component;
import dagger.android.AndroidInjector;

@Singleton
@Component(modules = {AppModule.class})
interface AppComponent extends AndroidInjector<App> {
    //DatabaseComponent databaseComponent();

    @Component.Builder
    abstract class Builder extends AndroidInjector.Builder<App> {
    }
}