package ru.inwords.inwords.dagger

import android.content.Context
import android.content.res.Resources
import dagger.Module
import dagger.Provides
import ru.inwords.inwords.data.repository.SettingsRepository
import ru.inwords.inwords.data.source.database.AppRoomDatabase
import ru.inwords.inwords.game.data.repository.CustomGameGatewayController
import ru.inwords.inwords.game.data.repository.custom_game.CustomGameCreator
import ru.inwords.inwords.game.data.repository.custom_game.GameCreator
import ru.inwords.inwords.game.data.repository.custom_game.LevelInfoGenerator
import ru.inwords.inwords.game.data.source.GameDao
import ru.inwords.inwords.game.data.source.GameInfoDao
import ru.inwords.inwords.game.data.source.GameLevelDao
import ru.inwords.inwords.game.data.source.LevelScoreRequestDao
import ru.inwords.inwords.profile.data.repository.UserCachingRepository
import ru.inwords.inwords.profile.data.repository.UserDatabaseRepository
import ru.inwords.inwords.profile.data.repository.UserRemoteRepository
import ru.inwords.inwords.profile.data.repository.UserRepository
import ru.inwords.inwords.texttospeech.data.repository.TtsCachingRepository
import ru.inwords.inwords.texttospeech.data.repository.TtsDatabaseRepository
import ru.inwords.inwords.texttospeech.data.repository.TtsRemoteRepository
import ru.inwords.inwords.texttospeech.data.repository.TtsRepository
import ru.inwords.inwords.translation.data.source.WordTranslationDao
import javax.inject.Singleton

@Module
internal class DataAccessModule {
    @Provides
    @Singleton
    fun wordTranslationDao(database: AppRoomDatabase): WordTranslationDao {
        return database.wordTranslationDao()
    }

    @Provides
    fun resources(context: Context): Resources {
        return context.resources
    }

    @Provides
    @Singleton
    fun ttsRep(databaseRepository: TtsDatabaseRepository,
               remoteRepository: TtsRemoteRepository,
               settingsRepository: SettingsRepository): TtsRepository {
        return TtsCachingRepository(databaseRepository, remoteRepository, settingsRepository)
    }

    @Provides
    @Singleton
    fun userRep(database: AppRoomDatabase,
                userRemoteRepository: UserRemoteRepository): UserRepository {
        return UserCachingRepository(UserDatabaseRepository(database.userDao()), userRemoteRepository)
    }

    @Provides
    @Singleton
    fun gameCreator(customGameGatewayController: CustomGameGatewayController): GameCreator {
        return CustomGameCreator(customGameGatewayController, LevelInfoGenerator())
    }

    @Provides
    fun gameInfoDao(database: AppRoomDatabase): GameInfoDao {
        return database.gameInfoDao()
    }

    @Provides
    fun gameDao(database: AppRoomDatabase): GameDao {
        return database.gameDao()
    }

    @Provides
    fun gameLevelDao(database: AppRoomDatabase): GameLevelDao {
        return database.gameLevelDao()
    }

    @Provides
    fun levelScoreRequestDao(database: AppRoomDatabase): LevelScoreRequestDao {
        return database.levelScoreRequestDao()
    }
}
