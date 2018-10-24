package com.dreamproject.inwords.dagger;

import com.dreamproject.inwords.data.source.WebService.WebApiService;

import javax.inject.Singleton;

import dagger.Component;

@Singleton
@Component(modules = DataModule.class)
public interface DataComponent {
    WebApiService getApiService();
}
