package com.dreamproject.inwords.dagger;


import android.app.Application;
import android.content.Context;

import com.dreamproject.inwords.App;

import javax.inject.Singleton;

import dagger.Binds;
import dagger.Module;
import dagger.android.AndroidInjectionModule;

@Module(includes = AndroidInjectionModule.class)
abstract class AppModule {

    @Binds
    @Singleton
    // Singleton annotation isn't necessary (in this case since Application instance is unique)
    // but is here for convention.
    abstract Context provideApplicationContext(App app);
}
