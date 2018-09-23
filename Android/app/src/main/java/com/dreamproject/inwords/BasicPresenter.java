package com.dreamproject.inwords;

import android.app.Application;

import com.dreamproject.inwords.model.MainModel;
import com.dreamproject.inwords.model.MainModelImpl;

import io.reactivex.disposables.CompositeDisposable;

public class BasicPresenter {
    protected Application application;

    protected CompositeDisposable compositeDisposable;

    protected MainModel model;

    protected BasicPresenter(Application application) {
        this.application = application;

        compositeDisposable = new CompositeDisposable();

        model = MainModelImpl.getInstance(application);
    }

    public void dispose() {
        if (compositeDisposable != null && !compositeDisposable.isDisposed()) {
            compositeDisposable.dispose();
        }
    }
}
