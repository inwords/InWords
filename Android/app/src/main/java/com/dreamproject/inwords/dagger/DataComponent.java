package com.dreamproject.inwords.dagger;

import com.dreamproject.inwords.data.source.WebService.WebRequests;
import com.dreamproject.inwords.data.interactor.authorisation.AuthorisationInteractor;

import javax.inject.Singleton;

import dagger.Component;

@Singleton
@Component(modules = {DataModule.class, DataAbstractModule.class})
public interface DataComponent {
    WebRequests getWebRequests();
    AuthorisationInteractor getAuthorisationWebInteractor();
}
