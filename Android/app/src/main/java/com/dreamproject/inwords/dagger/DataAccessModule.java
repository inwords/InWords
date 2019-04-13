package com.dreamproject.inwords.dagger;

import com.dreamproject.inwords.data.repository.profile.UserCachingRepository;
import com.dreamproject.inwords.data.repository.profile.UserDatabaseRepository;
import com.dreamproject.inwords.data.repository.profile.UserRemoteRepository;
import com.dreamproject.inwords.data.repository.profile.UserRepository;
import com.dreamproject.inwords.data.source.database.AppRoomDatabase;
import com.dreamproject.inwords.data.source.database.WordTranslationDao;
import com.dreamproject.inwords.data.source.database.game.GameDao;
import com.dreamproject.inwords.data.source.database.game.GameInfoDao;
import com.dreamproject.inwords.data.source.database.game.GameLevelDao;

import javax.inject.Singleton;

import dagger.Module;
import dagger.Provides;

@Module
public class DataAccessModule {
    @Provides
    @Singleton
    WordTranslationDao wordTranslationDao(AppRoomDatabase database) {
        return database.wordTranslationDao();
    }

    @Provides
    @Singleton
    UserRepository userRep(AppRoomDatabase database,
                           UserRemoteRepository userRemoteRepository) {
        return new UserCachingRepository(new UserDatabaseRepository(database.userDao()), userRemoteRepository);
    }

    @Provides
    GameInfoDao gameInfoDao(AppRoomDatabase database) {
        return database.gameInfoDao();
    }

    @Provides
    GameDao gameDao(AppRoomDatabase database) {
        return database.gameDao();
    }

    @Provides
    GameLevelDao gameLevelDao(AppRoomDatabase database) {
        return database.gameLevelDao();
    }
}
