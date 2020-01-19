package ru.inwords.inwords.dagger

import dagger.Component
import dagger.android.AndroidInjector
import ru.inwords.inwords.App
import ru.inwords.inwords.authorisation.di.AuthorisationDaggerModule
import ru.inwords.inwords.data.source.database.RoomTypeConverter
import ru.inwords.inwords.game.data.deferred.level_score.LevelScoreUploadWorker
import ru.inwords.inwords.game.di.OctoGameDaggerModule
import ru.inwords.inwords.home.HomeFragmentDaggerModule
import ru.inwords.inwords.main_activity.di.MainActivityDaggerModule
import ru.inwords.inwords.policy.di.PolicyFragmentDaggerModule
import ru.inwords.inwords.profile.di.ProfileFragmentDaggerModule
import ru.inwords.inwords.translation.di.TranslationDaggerModule
import javax.inject.Singleton

@Singleton
@Component(modules = [AppModule::class,
    AuthorisationDaggerModule::class,
    HomeFragmentDaggerModule::class,
    TranslationDaggerModule::class,
    OctoGameDaggerModule::class,
    MainActivityDaggerModule::class,
    ProfileFragmentDaggerModule::class,
    PolicyFragmentDaggerModule::class])
interface AppComponent : AndroidInjector<App> {
    fun inject(roomTypeConverter: RoomTypeConverter)
    fun inject(LevelScoreUploadWorker: LevelScoreUploadWorker)

    @Component.Factory
    interface Factory : AndroidInjector.Factory<App>
}