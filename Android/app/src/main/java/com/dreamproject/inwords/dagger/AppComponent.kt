package com.dreamproject.inwords.dagger

import com.dreamproject.inwords.App
import com.dreamproject.inwords.data.source.database.RoomTypeConverter
import com.dreamproject.inwords.presentation.viewScenario.authorisation.AuthorisationDaggerModule
import com.dreamproject.inwords.presentation.viewScenario.main.MainFragmentModule
import com.dreamproject.inwords.presentation.viewScenario.octoGame.OctoGameDaggerModule
import com.dreamproject.inwords.presentation.viewScenario.translation.TranslationDaggerModule
import dagger.Component
import dagger.android.AndroidInjector
import javax.inject.Singleton

@Singleton
@Component(modules = [AppModule::class,
    AuthorisationDaggerModule::class,
    MainFragmentModule::class,
    TranslationDaggerModule::class,
    OctoGameDaggerModule::class])
interface AppComponent : AndroidInjector<App> {
    fun inject(roomTypeConverter: RoomTypeConverter)

    @Component.Factory
    interface Factory : AndroidInjector.Factory<App>
}