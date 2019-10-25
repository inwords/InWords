package ru.inwords.inwords.dagger


import android.content.Context
import dagger.Binds
import dagger.Module
import dagger.android.AndroidInjectionModule
import dagger.android.support.AndroidSupportInjectionModule
import ru.inwords.inwords.App

@Module(includes = [AndroidInjectionModule::class,
    AndroidSupportInjectionModule::class,
    DataSourcesModule::class,
    DataAbstractModule::class,
    DataAccessModule::class,
    DeferredEntriesModule::class])
abstract class AppModule {
    @Binds
    // Singleton annotation isn't necessary (in this case since Application instance is unique)
    internal abstract fun applicationContext(app: App): Context
}
