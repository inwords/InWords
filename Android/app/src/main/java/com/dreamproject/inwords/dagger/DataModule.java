package com.dreamproject.inwords.dagger;

import com.dreamproject.inwords.BuildConfig;
import com.dreamproject.inwords.data.source.WebService.BasicAuthenticator;
import com.dreamproject.inwords.data.source.WebService.WebApiService;

import java.util.concurrent.TimeUnit;

import javax.inject.Singleton;

import dagger.Module;
import dagger.Provides;
import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;

@Module
public class DataModule {
    @Provides
    @Singleton
    WebApiService provideApiService(Retrofit retrofit) {
        return retrofit.create(WebApiService.class);
    }

    @Provides
    @Singleton
    Retrofit provideRetrofit(OkHttpClient client) {
        return new Retrofit.Builder()
                .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                .addConverterFactory(GsonConverterFactory.create())
                .client(client)
                .baseUrl(BuildConfig.API_URL)

                .build();
    }

    @Provides
    @Singleton
    OkHttpClient provideOkHttpClient(BasicAuthenticator authenticator) {
        return new OkHttpClient.Builder()
                .addInterceptor(new HttpLoggingInterceptor().
                        setLevel((BuildConfig.DEBUG) ?
                                HttpLoggingInterceptor.Level.BODY :
                                HttpLoggingInterceptor.Level.NONE))
                .authenticator(authenticator)
                .connectTimeout(5, TimeUnit.SECONDS)
                .readTimeout(5, TimeUnit.SECONDS)
                .writeTimeout(5, TimeUnit.SECONDS)
                .build();
    }
}
