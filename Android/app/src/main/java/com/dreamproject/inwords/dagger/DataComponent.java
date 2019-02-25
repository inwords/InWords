package com.dreamproject.inwords.dagger;

import com.dreamproject.inwords.data.source.webService.WebRequestsManager;
import com.dreamproject.inwords.domain.interactor.authorisation.AuthorisationInteractor;

import javax.inject.Singleton;

import dagger.Component;

@Singleton
@Component(modules = {DataSourcesModule.class, DataAbstractModule.class})
public interface DataComponent {
    WebRequestsManager getWebRequests();
    AuthorisationInteractor getAuthorisationWebInteractor();
}
