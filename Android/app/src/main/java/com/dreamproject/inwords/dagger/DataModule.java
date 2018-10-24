package com.dreamproject.inwords.dagger;

import com.dreamproject.inwords.BuildConfig;
import com.dreamproject.inwords.data.source.WebService.WebApiService;

import javax.inject.Singleton;

import dagger.Module;
import dagger.Provides;

@Module
public class DataModule {
    @Provides
    @Singleton
    public WebApiService provideApiService() {
        return WebApiService.Factory.create(BuildConfig.API_URL);
    }
}
