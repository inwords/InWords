package com.dreamproject.inwords.dagger;

import com.dreamproject.inwords.App;
import com.dreamproject.inwords.viewScenario.authorisation.Registration.RegistrationModule;
import com.dreamproject.inwords.viewScenario.authorisation.login.LoginModule;
import com.dreamproject.inwords.viewScenario.main.MainFragmentModule;
import com.dreamproject.inwords.viewScenario.translation.recycler.TranslationFragmentModule;

import javax.inject.Singleton;

import dagger.Component;
import dagger.android.AndroidInjector;

@Singleton
@Component(modules = {
        AppModule.class,
        LoginModule.class,
        RegistrationModule.class,
        TranslationFragmentModule.class,
        MainFragmentModule.class})
public interface AppComponent extends AndroidInjector<App> {

    @Component.Builder
    abstract class Builder extends AndroidInjector.Builder<App> {
    }
}