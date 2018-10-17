package com.dreamproject.inwords.model;

import android.app.Application;

import com.dreamproject.inwords.data.source.WebService.WebRequests;

public class MainModelFactory {
    private static MainModelImpl INSTANCE;

    public static MainModelImpl getInstance(final Application application) {
        if (INSTANCE == null) {
            synchronized (MainModelImpl.class) {
                if (INSTANCE == null) {
                    INSTANCE = new MainModelImpl(application, WebRequests.INSTANCE);
                }
            }
        }
        return INSTANCE;
    }
}
