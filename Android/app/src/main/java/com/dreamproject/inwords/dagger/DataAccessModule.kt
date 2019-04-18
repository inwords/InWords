package com.dreamproject.inwords.dagger

import com.dreamproject.inwords.data.repository.profile.UserCachingRepository
import com.dreamproject.inwords.data.repository.profile.UserDatabaseRepository
import com.dreamproject.inwords.data.repository.profile.UserRemoteRepository
import com.dreamproject.inwords.data.repository.profile.UserRepository
import com.dreamproject.inwords.data.source.database.AppRoomDatabase
import com.dreamproject.inwords.data.source.database.WordTranslationDao
import com.dreamproject.inwords.data.source.database.game.GameDao
import com.dreamproject.inwords.data.source.database.game.GameInfoDao
import com.dreamproject.inwords.data.source.database.game.GameLevelDao
import dagger.Module
import dagger.Provides
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
