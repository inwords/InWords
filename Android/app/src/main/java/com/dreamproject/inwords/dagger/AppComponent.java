package com.dreamproject.inwords.dagger;

import com.dreamproject.inwords.App;
import com.dreamproject.inwords.viewScenario.authorisation.registration.RegistrationFragmentModule;
import com.dreamproject.inwords.viewScenario.authorisation.login.LoginFragmentModule;
import com.dreamproject.inwords.viewScenario.main.MainFragmentModule;
import com.dreamproject.inwords.viewScenario.octoGame.GameLevelsFragmentModule;
import com.dreamproject.inwords.viewScenario.translation.addEditWord.AddEditWordFragmentModule;
import com.dreamproject.inwords.viewScenario.translation.translationMain.TranslationMainFragmentModule;

import javax.inject.Singleton;

import dagger.Component;
import dagger.android.AndroidInjector;

@Singleton
@Component(modules = {
        AppModule.class,
        LoginFragmentModule.class,
        RegistrationFragmentModule.class,
        MainFragmentModule.class,
        AddEditWordFragmentModule.class,
        TranslationMainFragmentModule.class,
        GameLevelsFragmentModule.class})
public interface AppComponent extends AndroidInjector<App> {

    @Component.Builder
    abstract class Builder extends AndroidInjector.Builder<App> {
    }
}