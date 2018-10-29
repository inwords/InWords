package com.dreamproject.inwords.util;

import android.content.Context;

import com.dreamproject.inwords.App;
import com.dreamproject.inwords.data.useCase.translation.TranslationModelFactory;
import com.dreamproject.inwords.data.useCase.translation.TranslationModelImpl;

public class DependenciesComponent {
    private static TranslationModelImpl MAIN_MODEL_INSTANCE;

    public static TranslationModelImpl getTranslationModelInstance(final Context context) {
        if (MAIN_MODEL_INSTANCE == null) {
            synchronized (TranslationModelImpl.class) {
                if (MAIN_MODEL_INSTANCE == null) {
                    MAIN_MODEL_INSTANCE = TranslationModelFactory.createOne(context, App.webRequests);
                }
            }
        }
        return MAIN_MODEL_INSTANCE;
    }

}
