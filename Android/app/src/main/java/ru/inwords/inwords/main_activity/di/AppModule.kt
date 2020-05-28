package ru.inwords.inwords.main_activity.di


import android.content.Context
import dagger.Binds
import dagger.Module
import ru.inwords.inwords.App
import ru.inwords.inwords.authorisation.di.AuthorisationAndroidInjectorsModule
import ru.inwords.inwords.authorisation.di.AuthorisationModule
import ru.inwords.inwords.game.di.WordSetsAndroidInjectorsModule
import ru.inwords.inwords.game.di.WordSetsModule
import ru.inwords.inwords.network.di.NetworkCoreModule
import ru.inwords.inwords.policy.di.PolicyAndroidInjectorsModule
import ru.inwords.inwords.policy.di.PolicyModule
import ru.inwords.inwords.profile.di.ProfileAndroidInjectorsModule
import ru.inwords.inwords.profile.di.ProfileModule
import ru.inwords.inwords.texttospeech.di.TtsModule
import ru.inwords.inwords.translation.di.TranslationAndroidInjectorsModule
import ru.inwords.inwords.translation.di.TranslationModule

@Module(
    includes = [
        AuthorisationAndroidInjectorsModule::class,
        AuthorisationModule::class,
        TranslationAndroidInjectorsModule::class,
        TranslationModule::class,
        WordSetsAndroidInjectorsModule::class,
        WordSetsModule::class,
        MainActivityAndroidInjectorsModule::class,
        IntegrationModule::class,
        ProfileAndroidInjectorsModule::class,
        ProfileModule::class,
        TtsModule::class,
        PolicyAndroidInjectorsModule::class,
        PolicyModule::class,
        NetworkCoreModule::class
    ]
)
abstract class AppModule {
    @Binds
    // Singleton annotation isn't necessary (in this case since Application instance is unique)
    internal abstract fun applicationContext(app: App): Context
}
