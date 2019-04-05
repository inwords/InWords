package com.dreamproject.inwords.dagger;

import com.dreamproject.inwords.App;
import com.dreamproject.inwords.data.source.database.RoomTypeConverter;
import com.dreamproject.inwords.presentation.viewScenario.authorisation.login.LoginFragmentModule;
import com.dreamproject.inwords.presentation.viewScenario.authorisation.registration.RegistrationFragmentModule;
import com.dreamproject.inwords.presentation.viewScenario.main.MainFragmentModule;
import com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevel.GameLevelModule;
import com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevels.GameLevelsModule;
import com.dreamproject.inwords.presentation.viewScenario.octoGame.games.GamesModule;
import com.dreamproject.inwords.presentation.viewScenario.translation.addEditWord.AddEditWordFragmentModule;
import com.dreamproject.inwords.presentation.viewScenario.translation.translationMain.TranslationMainFragmentModule;

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
        GamesModule.class,
        GameLevelsModule.class,
        GameLevelModule.class})
public interface AppComponent extends AndroidInjector<App> {
    void inject(RoomTypeConverter roomTypeConverter);

    @Component.Builder
    abstract class Builder extends AndroidInjector.Builder<App> {
    }
}