package ru.inwords.inwords.dagger

import dagger.Component
import dagger.android.AndroidInjector
import ru.inwords.inwords.App
import ru.inwords.inwords.data.source.database.RoomTypeConverter
import ru.inwords.inwords.presentation.viewScenario.authorisation.AuthorisationDaggerModule
import ru.inwords.inwords.presentation.viewScenario.home.HomeFragmentModule
import ru.inwords.inwords.presentation.viewScenario.octoGame.OctoGameDaggerModule
import ru.inwords.inwords.presentation.viewScenario.translation.TranslationDaggerModule
import javax.inject.Singleton

@Singleton
@Component(modules = [AppModule::class,
    AuthorisationDaggerModule::class,
    HomeFragmentModule::class,
    TranslationDaggerModule::class,
    OctoGameDaggerModule::class])
interface AppComponent : AndroidInjector<App> {
    fun inject(roomTypeConverter: RoomTypeConverter)

    @Component.Factory
    interface Factory : AndroidInjector.Factory<App>
}