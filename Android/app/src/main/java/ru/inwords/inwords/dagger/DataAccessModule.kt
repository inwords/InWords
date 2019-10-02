package ru.inwords.inwords.dagger

import android.content.Context
import android.content.res.Resources
import dagger.Module
import dagger.Provides
import ru.inwords.inwords.data.repository.game.CustomGameGatewayController
import ru.inwords.inwords.data.repository.game.custom_game.CustomGameCreator
import ru.inwords.inwords.data.repository.game.custom_game.GameCreator
import ru.inwords.inwords.data.repository.game.custom_game.LevelInfoGenerator
import ru.inwords.inwords.data.repository.profile.UserCachingRepository
import ru.inwords.inwords.data.repository.profile.UserDatabaseRepository
import ru.inwords.inwords.data.repository.profile.UserRemoteRepository
import ru.inwords.inwords.data.repository.profile.UserRepository
import ru.inwords.inwords.data.repository.texttospeech.TtsCachingRepository
import ru.inwords.inwords.data.repository.texttospeech.TtsDatabaseRepository
import ru.inwords.inwords.data.repository.texttospeech.TtsRemoteRepository
import ru.inwords.inwords.data.repository.texttospeech.TtsRepository
import ru.inwords.inwords.data.source.database.AppRoomDatabase
import ru.inwords.inwords.data.source.database.WordTranslationDao
import ru.inwords.inwords.data.source.database.game.GameDao
import ru.inwords.inwords.data.source.database.game.GameInfoDao
import ru.inwords.inwords.data.source.database.game.GameLevelDao
import ru.inwords.inwords.data.source.database.game.LevelScoreRequestDao
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
               remoteRepository: TtsRemoteRepository): TtsRepository {
        return TtsCachingRepository(databaseRepository, remoteRepository)
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
