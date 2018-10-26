package com.dreamproject.inwords.util;

import android.content.Context;

import com.dreamproject.inwords.dagger.DaggerDataComponent;
import com.dreamproject.inwords.dagger.DataComponent;
import com.dreamproject.inwords.model.authorisation.AuthorisationInteractor;
import com.dreamproject.inwords.model.authorisation.AuthorisationWebInteractor;
import com.dreamproject.inwords.model.translation.TranslationModelFactory;
import com.dreamproject.inwords.model.translation.TranslationModelImpl;

public class DependenciesComponent {
    private static AuthorisationInteractor AUTHORISATION_INTERACTOR_INSTANCE;
    private static TranslationModelImpl MAIN_MODEL_INSTANCE;
    private static DataComponent DATA_COMPONENT_INSTANCE;

    public static AuthorisationInteractor getAuthorisationInteractorInstance() {
        if (AUTHORISATION_INTERACTOR_INSTANCE == null) {
            synchronized (AuthorisationWebInteractor.class) {
                if (AUTHORISATION_INTERACTOR_INSTANCE == null) {
                    AUTHORISATION_INTERACTOR_INSTANCE = getDataComponentInstance().getAuthorisationWebInteractor();
                }
            }
        }
        return AUTHORISATION_INTERACTOR_INSTANCE;
    }

    public static TranslationModelImpl getTranslationModelInstance(final Context context) {
        if (MAIN_MODEL_INSTANCE == null) {
            synchronized (TranslationModelImpl.class) {
                if (MAIN_MODEL_INSTANCE == null) {
                    MAIN_MODEL_INSTANCE = TranslationModelFactory.createOne(context, getDataComponentInstance().getWebRequests());
                }
            }
        }
        return MAIN_MODEL_INSTANCE;
    }

    public static DataComponent getDataComponentInstance() {
        if (DATA_COMPONENT_INSTANCE == null) {
            synchronized (TranslationModelImpl.class) {
                if (DATA_COMPONENT_INSTANCE == null) {
                    DATA_COMPONENT_INSTANCE = DaggerDataComponent.create();
                }
            }
        }
        return DATA_COMPONENT_INSTANCE;
    }
}
