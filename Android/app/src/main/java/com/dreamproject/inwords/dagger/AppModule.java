package com.dreamproject.inwords.dagger;


import android.content.Context;

import com.dreamproject.inwords.App;

import javax.inject.Singleton;

import dagger.Binds;
import dagger.Module;
import dagger.android.AndroidInjectionModule;
import dagger.android.support.AndroidSupportInjectionModule;

@Module(includes = {AndroidInjectionModule.class,
        AndroidSupportInjectionModule.class,
        DataSourcesModule.class,
        DataAbstractModule.class,
        DataAccessModule.class
})
abstract class AppModule {
    @Binds
    @Singleton
    // Singleton annotation isn't necessary (in this case since Application instance is unique)
    // but is here for convention.
    abstract Context applicationContext(App app);
}
