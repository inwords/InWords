package com.dreamproject.inwords.util;

import android.content.Context;

import com.dreamproject.inwords.BuildConfig;
import com.dreamproject.inwords.data.source.WebService.WebApiService;
import com.dreamproject.inwords.data.source.WebService.WebRequests;
import com.dreamproject.inwords.model.authorisation.AuthorisationWebInteractor;
import com.dreamproject.inwords.model.translation.TranslationModelFactory;
import com.dreamproject.inwords.model.translation.TranslationModelImpl;

public class DependenciesComponent {
    private static AuthorisationWebInteractor AUTHORISATION_INTERACTOR_INSTANCE;
    private static TranslationModelImpl MAIN_MODEL_INSTANCE;
    private static WebRequests WEB_REQUESTS_INSTANCE;

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

    public static TranslationModelImpl getTranslationModelInstance(final Context context) {
        if (MAIN_MODEL_INSTANCE == null) {
            synchronized (TranslationModelImpl.class) {
                if (MAIN_MODEL_INSTANCE == null) {
                    MAIN_MODEL_INSTANCE = TranslationModelFactory.createOne(context, getWebRequestsInstance());
                }
            }
        }
        return MAIN_MODEL_INSTANCE;
    }

    public static WebRequests getWebRequestsInstance() {
        if (WEB_REQUESTS_INSTANCE == null) {
            synchronized (WebRequests.class) {
                if (WEB_REQUESTS_INSTANCE == null) {
                    WEB_REQUESTS_INSTANCE = new WebRequests(WebApiService.Factory.create(BuildConfig.API_URL));
                }
            }
        }
        return WEB_REQUESTS_INSTANCE;
    }

}
