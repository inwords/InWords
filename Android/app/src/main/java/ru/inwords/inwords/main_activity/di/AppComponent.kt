package ru.inwords.inwords.main_activity.di

import dagger.Component
import dagger.android.AndroidInjectionModule
import dagger.android.AndroidInjector
import dagger.android.support.AndroidSupportInjectionModule
import ru.inwords.inwords.App
import ru.inwords.inwords.game.data.deferred.level_score.LevelScoreUploadWorker
import ru.inwords.inwords.main_activity.data.source.database.RoomTypeConverter
import javax.inject.Singleton

@Singleton
@Component(
    modules = [
        AppModule::class,
        AndroidInjectionModule::class,
        AndroidSupportInjectionModule::class,
        DataSourcesModule::class,
        DataAbstractModule::class
    ]
)
interface AppComponent : AndroidInjector<App> {
    fun inject(roomTypeConverter: RoomTypeConverter)
    fun inject(LevelScoreUploadWorker: LevelScoreUploadWorker)

    @Component.Factory
    interface Factory : AndroidInjector.Factory<App>
}