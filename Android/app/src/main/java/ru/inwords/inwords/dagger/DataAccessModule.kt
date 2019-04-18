package ru.inwords.inwords.dagger

import dagger.Module
import dagger.Provides
import ru.inwords.inwords.data.repository.profile.UserCachingRepository
import ru.inwords.inwords.data.repository.profile.UserDatabaseRepository
import ru.inwords.inwords.data.repository.profile.UserRemoteRepository
import ru.inwords.inwords.data.repository.profile.UserRepository
import ru.inwords.inwords.data.source.database.AppRoomDatabase
import ru.inwords.inwords.data.source.database.WordTranslationDao
import ru.inwords.inwords.data.source.database.game.GameDao
import ru.inwords.inwords.data.source.database.game.GameInfoDao
import ru.inwords.inwords.data.source.database.game.GameLevelDao
import javax.inject.Singleton

@Module
internal class DataAccessModule {
    @Provides
    @Singleton
    fun wordTranslationDao(database: AppRoomDatabase): WordTranslationDao {
        return database.wordTranslationDao()
    }

    @Provides
    @Singleton
    fun userRep(database: AppRoomDatabase,
                userRemoteRepository: UserRemoteRepository): UserRepository {
        return UserCachingRepository(UserDatabaseRepository(database.userDao()), userRemoteRepository)
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
}
