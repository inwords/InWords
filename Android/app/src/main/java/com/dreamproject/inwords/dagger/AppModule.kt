package com.dreamproject.inwords.dagger


import android.content.Context
import com.dreamproject.inwords.App
import dagger.Binds
import dagger.Module
import dagger.android.AndroidInjectionModule
import dagger.android.support.AndroidSupportInjectionModule

@Module(includes = [AndroidInjectionModule::class,
    AndroidSupportInjectionModule::class,
    DataSourcesModule::class,
    DataAbstractModule::class,
    DataAccessModule::class])
abstract class AppModule {
    @Binds
    // Singleton annotation isn't necessary (in this case since Application instance is unique)
    internal abstract fun applicationContext(app: App): Context
}
