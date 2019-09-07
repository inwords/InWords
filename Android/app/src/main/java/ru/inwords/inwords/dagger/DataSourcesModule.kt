package ru.inwords.inwords.dagger

import android.content.Context
import android.content.SharedPreferences
import androidx.room.Room
import com.google.gson.Gson
import dagger.Module
import dagger.Provides
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import retrofit2.converter.gson.GsonConverterFactory
import ru.inwords.inwords.BuildConfig
import ru.inwords.inwords.dagger.annotations.Common
import ru.inwords.inwords.data.source.database.AppRoomDatabase
import ru.inwords.inwords.data.source.webService.BasicAuthenticator
import ru.inwords.inwords.data.source.webService.WebApiService
import java.util.concurrent.TimeUnit
import javax.inject.Singleton

@Module
class DataSourcesModule {
    @Provides
    @Singleton
    fun gson(): Gson {
        return Gson()
    }

    @Provides
    @Singleton
    fun database(context: Context): AppRoomDatabase {
        return Room.databaseBuilder(context, AppRoomDatabase::class.java, "cache")
                .build()
    }

    @Provides
    @Singleton
    fun provideApiService(retrofit: Retrofit): WebApiService {
        return retrofit.create(WebApiService::class.java)
    }

    @Provides
    @Singleton
    fun provideRetrofit(client: OkHttpClient, gson: Gson): Retrofit {
        return Retrofit.Builder()
                .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                .addConverterFactory(GsonConverterFactory.create(gson))
                .client(client)
                .baseUrl(BuildConfig.API_URL)
                .build()
    }

    @Provides
    @Singleton
    fun provideOkHttpClient(authenticator: BasicAuthenticator): OkHttpClient {
        return OkHttpClient.Builder()
                .addInterceptor(HttpLoggingInterceptor().setLevel(if (BuildConfig.DEBUG)
                    HttpLoggingInterceptor.Level.BODY
                else
                    HttpLoggingInterceptor.Level.NONE))
                .authenticator(authenticator)
//                .addInterceptor(headersInterceptor)
                .connectTimeout(40, TimeUnit.SECONDS)
                .readTimeout(40, TimeUnit.SECONDS)
                .writeTimeout(40, TimeUnit.SECONDS)
                .build()
    }

    @Provides
    @Common
    @Singleton
    internal fun provideSharedPreferences(context: Context): SharedPreferences {
        return context.getSharedPreferences("prefs", Context.MODE_PRIVATE)
    }
}
