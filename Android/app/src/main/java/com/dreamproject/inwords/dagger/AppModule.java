package com.dreamproject.inwords.dagger;


import android.content.Context;

import com.dreamproject.inwords.App;
import com.dreamproject.inwords.viewScenario.authorisation.login.LoginFragment;

import javax.inject.Singleton;

import dagger.Binds;
import dagger.Module;
import dagger.android.AndroidInjectionModule;
import dagger.android.ContributesAndroidInjector;

@Module(includes = AndroidInjectionModule.class)
abstract class AppModule {

    @Binds
    @Singleton
    // Singleton annotation isn't necessary (in this case since Application instance is unique)
    // but is here for convention.
    abstract Context provideApplicationContext(App app);

    @ContributesAndroidInjector(modules = {
        DataModule.class
    })
    @LoginFragmentScope
    abstract LoginFragment loginFragment();
}
