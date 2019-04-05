package com.dreamproject.inwords.dagger;

import com.dreamproject.inwords.dagger.annotations.QGame;
import com.dreamproject.inwords.dagger.annotations.QGameInfo;
import com.dreamproject.inwords.dagger.annotations.QGameLevel;
import com.dreamproject.inwords.data.dto.game.Game;
import com.dreamproject.inwords.data.dto.game.GameInfo;
import com.dreamproject.inwords.data.dto.game.GameLevel;
import com.dreamproject.inwords.data.repository.game.GameDatabaseRepository;
import com.dreamproject.inwords.data.repository.game.GameEntityCachingRepository;
import com.dreamproject.inwords.data.repository.game.GameEntityProvider;
import com.dreamproject.inwords.data.repository.game.GameListCachingRepository;
import com.dreamproject.inwords.data.repository.game.GameListProvider;
import com.dreamproject.inwords.data.repository.game.GameRemoteRepository;
import com.dreamproject.inwords.data.repository.profile.UserCachingRepository;
import com.dreamproject.inwords.data.repository.profile.UserDatabaseRepository;
import com.dreamproject.inwords.data.repository.profile.UserRemoteRepository;
import com.dreamproject.inwords.data.repository.profile.UserRepository;
import com.dreamproject.inwords.data.source.database.AppRoomDatabase;
import com.dreamproject.inwords.data.source.database.WordTranslationDao;

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

    @QGame
    @Provides
    @Singleton
    GameEntityProvider<Game> gameRep(AppRoomDatabase database,
                                     GameRemoteRepository gameRemoteRepository) {
        return new GameEntityCachingRepository<>(new GameDatabaseRepository<>(database.gameDao()),
                gameRemoteRepository::getGame);
    }

    @QGameLevel
    @Provides
    @Singleton
    GameEntityProvider<GameLevel> gameLevelRep(AppRoomDatabase database,
                                               GameRemoteRepository gameRemoteRepository) {
        return new GameEntityCachingRepository<>(new GameDatabaseRepository<>(database.gameLevelDao()),
                gameRemoteRepository::getLevel);
    }

    @QGameInfo
    @Provides
    @Singleton
    GameListProvider<GameInfo> gameInfoRep(AppRoomDatabase database,
                                           GameRemoteRepository gameRemoteRepository) {
        return new GameListCachingRepository<>(new GameDatabaseRepository<>(database.gameInfoDao()),
                gameRemoteRepository::getGameInfos);
    }
}
