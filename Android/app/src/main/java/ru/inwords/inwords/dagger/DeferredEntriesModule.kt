package ru.inwords.inwords.dagger

import dagger.Module
import dagger.Provides
import ru.inwords.inwords.data.source.database.AppRoomDatabase
import ru.inwords.inwords.data.source.remote.WebRequestsManagerAuthorised
import ru.inwords.inwords.translation.data.deferred.WordTranslationDeferredAdapterFactory
import ru.inwords.inwords.translation.data.deferred.WordTranslationDeferredAdapterHolder
import javax.inject.Singleton

@Module
class DeferredEntriesModule {

    @Singleton
    @Provides
    fun wordTranslationDeferredAdapterHolder(database: AppRoomDatabase,
                                             webRequestsManagerAuthorised: WebRequestsManagerAuthorised
    ): WordTranslationDeferredAdapterHolder {
        val factory = WordTranslationDeferredAdapterFactory(database.localWordTranslationEntriesListDao(), webRequestsManagerAuthorised)

        return WordTranslationDeferredAdapterHolder(factory)
    }
}