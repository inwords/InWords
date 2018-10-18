package com.dreamproject.inwords.util;

import android.app.Application;

import com.dreamproject.inwords.data.source.WebService.WebRequests;
import com.dreamproject.inwords.model.MainModelFactory;
import com.dreamproject.inwords.model.MainModelImpl;
import com.dreamproject.inwords.model.authorisation.AuthorisationWebInteractor;

public class DependenciesComponent {
    private static AuthorisationWebInteractor AUTHORISATION_INTERACTOR_INSTANCE;
    private static MainModelImpl MAIN_MODEL_INSTANCE;
    private static WebRequests WEB_REQUESTS_INSTANCE = WebRequests.INSTANCE;

    public static AuthorisationWebInteractor getAuthorisationInteractorInstance() {
        if (AUTHORISATION_INTERACTOR_INSTANCE == null) {
            synchronized (AuthorisationWebInteractor.class) {
                if (AUTHORISATION_INTERACTOR_INSTANCE == null) {
                    AUTHORISATION_INTERACTOR_INSTANCE = new AuthorisationWebInteractor(getWebRequestsInstance());
                }
            }
        }
        return AUTHORISATION_INTERACTOR_INSTANCE;
    }

    public static MainModelImpl getMainModelInstance(final Application application) {
        if (MAIN_MODEL_INSTANCE == null) {
            synchronized (MainModelImpl.class) {
                if (MAIN_MODEL_INSTANCE == null) {
                    MAIN_MODEL_INSTANCE = MainModelFactory.createOne(application, getWebRequestsInstance());
                }
            }
        }
        return MAIN_MODEL_INSTANCE;
    }

    private static WebRequests getWebRequestsInstance() {
        return WEB_REQUESTS_INSTANCE;
    }

}
