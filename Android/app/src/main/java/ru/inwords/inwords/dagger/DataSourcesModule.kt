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
import ru.inwords.inwords.core.ResourceManager
import ru.inwords.inwords.dagger.annotations.AuthorisedZone
import ru.inwords.inwords.dagger.annotations.Common
import ru.inwords.inwords.dagger.annotations.UnauthorisedZone
import ru.inwords.inwords.data.source.database.AppRoomDatabase
import ru.inwords.inwords.data.source.remote.ApiServiceAuthorised
import ru.inwords.inwords.data.source.remote.ApiServiceUnauthorised
import ru.inwords.inwords.data.source.remote.BasicAuthenticator
import ru.inwords.inwords.data.source.remote.TokenInterceptor
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
            .fallbackToDestructiveMigration()
            .build()
    }

    @Provides
    @Singleton
    fun provideApiServiceUnauthorised(@UnauthorisedZone client: OkHttpClient, gson: Gson): ApiServiceUnauthorised {
        return provideRetrofit1(client, gson).create(ApiServiceUnauthorised::class.java)
    }

    @Provides
    @Singleton
    fun provideApiServiceAuthorised(@AuthorisedZone client: OkHttpClient, gson: Gson): ApiServiceAuthorised {
        return provideRetrofit1(client, gson).create(ApiServiceAuthorised::class.java)
    }

    private fun provideRetrofit1(@AuthorisedZone client: OkHttpClient, gson: Gson): Retrofit {
        return Retrofit.Builder()
            .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
            .addConverterFactory(GsonConverterFactory.create(gson))
            .client(client)
            .baseUrl(BuildConfig.API_URL)
            .build()
    }

    @Provides
    @Singleton
    @UnauthorisedZone
    fun provideOkHttpClientUnauthorised(): OkHttpClient {
        return provideOkHttpBuilder()
            .build()
    }

    @Provides
    @Singleton
    @AuthorisedZone
    fun provideOkHttpClient(authenticator: BasicAuthenticator,
                            tokenInterceptor: TokenInterceptor): OkHttpClient {
        return provideOkHttpBuilder()
            .addInterceptor(tokenInterceptor)
            .authenticator(authenticator)
            .build()
    }

    private fun provideOkHttpBuilder(): OkHttpClient.Builder {
        return OkHttpClient.Builder()
            .addInterceptor(HttpLoggingInterceptor().setLevel(if (BuildConfig.DEBUG)
                HttpLoggingInterceptor.Level.BODY
            else
                HttpLoggingInterceptor.Level.NONE))
            .connectTimeout(40, TimeUnit.SECONDS)
            .readTimeout(40, TimeUnit.SECONDS)
            .writeTimeout(40, TimeUnit.SECONDS)
    }

    @Provides
    @Common
    @Singleton
    internal fun provideSharedPreferences(context: Context): SharedPreferences {
        return context.getSharedPreferences("prefs", Context.MODE_PRIVATE)
    }

    @Provides
    @Singleton
    fun provideResourceManager(context: Context): ResourceManager {
        return ResourceManager(context)
    }
}
