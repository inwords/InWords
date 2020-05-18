package ru.inwords.inwords.main_activity.di

import android.content.Context
import android.content.SharedPreferences
import androidx.room.Room
import androidx.work.WorkManager
import com.google.gson.Gson
import dagger.Lazy
import dagger.Module
import dagger.Provides
import io.grpc.ManagedChannel
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import retrofit2.converter.gson.GsonConverterFactory
import ru.inwords.inwords.BuildConfig
import ru.inwords.inwords.authorisation.data.ApiServiceUnauthorised
import ru.inwords.inwords.core.grpc.buildManagedChannel
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.main_activity.data.WorkManagerWrapper
import ru.inwords.inwords.main_activity.data.repository.SettingsRepository
import ru.inwords.inwords.main_activity.data.source.database.AppRoomDatabase
import ru.inwords.inwords.main_activity.di.annotations.Common
import ru.inwords.inwords.main_activity.di.annotations.GrpcDefaultChannel
import ru.inwords.inwords.main_activity.di.annotations.UnauthorisedZone
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
        return Retrofit.Builder()
            .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
            .addConverterFactory(GsonConverterFactory.create(gson))
            .client(client)
            .baseUrl(BuildConfig.API_URL)
            .build()
            .create(ApiServiceUnauthorised::class.java)
    }

    @Provides
    @Singleton
    @UnauthorisedZone
    fun provideOkHttpClientUnauthorised(): OkHttpClient {
        return provideBasicOkHttp()
    }

    private fun provideBasicOkHttp(): OkHttpClient {
        return OkHttpClient.Builder()
            .addInterceptor(HttpLoggingInterceptor().apply {
                level = (if (BuildConfig.DEBUG)
                    HttpLoggingInterceptor.Level.BODY
                else
                    HttpLoggingInterceptor.Level.NONE)
            })
            .connectTimeout(40, TimeUnit.SECONDS)
            .readTimeout(40, TimeUnit.SECONDS)
            .writeTimeout(40, TimeUnit.SECONDS)
            .build()
    }

    @Provides
    @Singleton
    @GrpcDefaultChannel
    fun provideManagedChannel(context: Context): ManagedChannel {
        return buildManagedChannel(context, BuildConfig.GRPC_API_URL)
    }

    @Provides
    @Singleton
    @Common
    internal fun provideSharedPreferences(context: Context): SharedPreferences {
        return context.getSharedPreferences("prefs", Context.MODE_PRIVATE)
    }

    @Provides
    @Singleton
    fun provideResourceManager(context: Context): ResourceManager {
        return ResourceManager(context)
    }

    @Singleton
    @Provides
    fun provideWorkManager(context: Context): WorkManager {
        return WorkManager.getInstance(context)
    }

    @Singleton
    @Provides
    fun provideWorkManagerWrapper(workManager: Lazy<WorkManager>): WorkManagerWrapper {
        return WorkManagerWrapper(workManager)
    }

    @Singleton
    @Provides
    fun provideSettingsRepository(context: Context): SettingsRepository {
        return SettingsRepository(context)
    }
}
