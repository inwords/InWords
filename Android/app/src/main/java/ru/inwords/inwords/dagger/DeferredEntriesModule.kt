package ru.inwords.inwords.dagger

import dagger.Module
import dagger.Provides
import ru.inwords.inwords.data.source.database.AppRoomDatabase
import ru.inwords.inwords.data.source.remote.WebRequestsManagerAuthorised
import ru.inwords.inwords.game.data.deferred.level_score.LevelScoreDeferredUploaderFactory
import ru.inwords.inwords.game.data.deferred.level_score.LevelScoreDeferredUploaderHolder
import ru.inwords.inwords.game.data.repository.GameRemoteRepository
import ru.inwords.inwords.game.data.source.LevelScoreRequestDao
import ru.inwords.inwords.translation.data.deferred.WordTranslationDeferredAdapterFactory
import ru.inwords.inwords.translation.data.deferred.WordTranslationDeferredAdapterHolder
import javax.inject.Singleton

@Module
class DeferredEntriesModule {

    @Singleton
    @Provides
    fun wordTranslationDeferredAdapterHolder(
        database: AppRoomDatabase,
        webRequestsManagerAuthorised: WebRequestsManagerAuthorised
    ): WordTranslationDeferredAdapterHolder {
        val factory = WordTranslationDeferredAdapterFactory(database.localWordTranslationEntriesListDao(), webRequestsManagerAuthorised)

        return WordTranslationDeferredAdapterHolder(factory)
    }

    @Singleton
    @Provides
    fun levelScoreDeferredUploaderHolder(
        gameRemoteRepository: GameRemoteRepository,
        levelScoreRequestDao: LevelScoreRequestDao
    ): LevelScoreDeferredUploaderHolder {
        val factory = LevelScoreDeferredUploaderFactory(gameRemoteRepository, levelScoreRequestDao)

        return LevelScoreDeferredUploaderHolder(factory)
    }
}