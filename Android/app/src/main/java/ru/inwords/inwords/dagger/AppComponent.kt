package ru.inwords.inwords.dagger

import dagger.Component
import dagger.android.AndroidInjector
import ru.inwords.inwords.App
import ru.inwords.inwords.data.source.database.RoomTypeConverter
import ru.inwords.inwords.game.di.OctoGameDaggerModule
import ru.inwords.inwords.presentation.view_scenario.authorisation.AuthorisationDaggerModule
import ru.inwords.inwords.presentation.view_scenario.home.HomeFragmentDaggerModule
import ru.inwords.inwords.presentation.view_scenario.main_activity.MainActivityDaggerModule
import ru.inwords.inwords.presentation.view_scenario.policy.PolicyFragmentDaggerModule
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

    @Component.Factory
    interface Factory : AndroidInjector.Factory<App>
}