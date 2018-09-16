package com.dreamproject.inwords;

import android.app.Application;

import io.reactivex.disposables.CompositeDisposable;

public class BasicPresenter {
    protected Application application;

    protected CompositeDisposable compositeDisposable;

    protected BasicPresenter(Application application)
    {
        this.application = application;

        compositeDisposable = new CompositeDisposable();
    }

    public void dispose() {
        if (compositeDisposable != null && compositeDisposable.isDisposed()) {
            compositeDisposable.dispose();
        }
    }
}
