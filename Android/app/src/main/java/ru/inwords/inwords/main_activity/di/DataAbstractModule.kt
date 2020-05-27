package ru.inwords.inwords.main_activity.di

import dagger.Binds
import dagger.Module
import ru.inwords.inwords.main_activity.data.source.remote.WebRequestsManagerAuthorised
import ru.inwords.inwords.main_activity.data.source.remote.WebRequestsManagerAuthorisedImpl
import javax.inject.Singleton

@Module
interface DataAbstractModule {

    @Binds
    @Singleton
    fun provideWebRequestsManagerAuthorised(webRequestsAuthorised: WebRequestsManagerAuthorisedImpl): WebRequestsManagerAuthorised
}
