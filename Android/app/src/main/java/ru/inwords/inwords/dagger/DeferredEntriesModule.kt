package ru.inwords.inwords.dagger

import android.content.Context
import androidx.work.WorkManager
import dagger.Module
import dagger.Provides
import ru.inwords.inwords.data.WorkManagerWrapper
import ru.inwords.inwords.data.source.database.AppRoomDatabase
import ru.inwords.inwords.game.data.deferred.level_score.LevelScoreDeferredUploaderFactory
import ru.inwords.inwords.game.data.deferred.level_score.LevelScoreDeferredUploaderHolder
import ru.inwords.inwords.game.data.repository.GameRemoteRepository
import ru.inwords.inwords.game.data.source.LevelScoreRequestDao
import ru.inwords.inwords.translation.data.deferred.LocalWordTranslationsListDao
import ru.inwords.inwords.translation.data.deferred.WordTranslationDeferredAdapterFactory
import ru.inwords.inwords.translation.data.deferred.WordTranslationDeferredAdapterHolder
import ru.inwords.inwords.translation.data.repository.TranslationWordsRemoteRepository
import javax.inject.Singleton

@Module
class DeferredEntriesModule {

    @Singleton
    @Provides
    fun wordTranslationDeferredAdapterHolder(
        database: AppRoomDatabase,
        translationWordsRemoteRepository: TranslationWordsRemoteRepository
    ): WordTranslationDeferredAdapterHolder {
        val factory = WordTranslationDeferredAdapterFactory(
            LocalWordTranslationsListDao(database.localWordTranslationEntriesListDao()),
            translationWordsRemoteRepository
        )

        return WordTranslationDeferredAdapterHolder(factory)
    }

    @Singleton
    @Provides
    fun levelScoreDeferredUploaderHolder(
        gameRemoteRepository: GameRemoteRepository,
        levelScoreRequestDao: LevelScoreRequestDao,
        workManagerWrapper: WorkManagerWrapper
    ): LevelScoreDeferredUploaderHolder {
        val factory = LevelScoreDeferredUploaderFactory(gameRemoteRepository, levelScoreRequestDao, workManagerWrapper)

        return LevelScoreDeferredUploaderHolder(factory)
    }

    @Singleton
    @Provides
    fun workManager(context: Context): WorkManager {
        return WorkManager.getInstance(context)
    }
}