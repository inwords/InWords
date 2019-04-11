package com.dreamproject.inwords.dagger;

import android.content.Context;

import com.dreamproject.inwords.BuildConfig;
import com.dreamproject.inwords.data.source.database.AppRoomDatabase;
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
