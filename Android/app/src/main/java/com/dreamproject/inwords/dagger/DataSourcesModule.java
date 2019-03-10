package com.dreamproject.inwords.dagger;

import android.content.Context;

import com.dreamproject.inwords.BuildConfig;
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
import com.dreamproject.inwords.data.source.database.AppRoomDatabase;
import com.dreamproject.inwords.data.source.database.WordTranslationDao;
import com.dreamproject.inwords.data.source.webService.BasicAuthenticator;
import com.dreamproject.inwords.data.source.webService.HeadersInterceptor;
import com.dreamproject.inwords.data.source.webService.WebApiService;
import com.google.gson.Gson;

import java.util.concurrent.TimeUnit;

import javax.inject.Singleton;

import androidx.room.Room;
import dagger.Module;
import dagger.Provides;
import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;

@Module
class DataSourcesModule {
    @Provides
    @Singleton
    Gson gson() {
        return new Gson();
    }

    @Provides
    @Singleton
    WordTranslationDao wordTranslationDao(AppRoomDatabase database) {
        return database.wordTranslationDao();
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

    @Provides
    @Singleton
    AppRoomDatabase database(Context context) {
        return Room.inMemoryDatabaseBuilder(context, //context is ApplicationContext btw
                AppRoomDatabase.class)//, "word_database")
                .build();
    }

    @Provides
    @Singleton
    WebApiService provideApiService(Retrofit retrofit) {
        return retrofit.create(WebApiService.class);
    }

    @Provides
    @Singleton
    Retrofit provideRetrofit(OkHttpClient client, Gson gson) {
        return new Retrofit.Builder()
                .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                .addConverterFactory(GsonConverterFactory.create(gson))
                .client(client)
                .baseUrl(BuildConfig.API_URL)

                .build();
    }

    @Provides
    @Singleton
    OkHttpClient provideOkHttpClient(BasicAuthenticator authenticator, HeadersInterceptor headersInterceptor) {
        return new OkHttpClient.Builder()
                .addInterceptor(new HttpLoggingInterceptor().
                        setLevel((BuildConfig.DEBUG) ?
                                HttpLoggingInterceptor.Level.BODY :
                                HttpLoggingInterceptor.Level.NONE))
                .authenticator(authenticator)
                .addInterceptor(headersInterceptor)
                .connectTimeout(15, TimeUnit.SECONDS)
                .readTimeout(15, TimeUnit.SECONDS)
                .writeTimeout(15, TimeUnit.SECONDS)
                .build();
    }
}
