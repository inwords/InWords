package com.dreamproject.inwords;

import android.app.Application;

import com.dreamproject.inwords.model.MainModel;
import com.dreamproject.inwords.model.MainModelImpl;

import io.reactivex.disposables.CompositeDisposable;

public class BasicPresenter implements BasePresenter {
    protected Application application;

    protected CompositeDisposable compositeDisposable;

    protected MainModel model;

    protected BasicPresenter(Application application) {
        this.application = application;

        compositeDisposable = new CompositeDisposable();

        model = MainModelImpl.getInstance(application);
    }

    @Override
    public void hintReloadDisposedComposite() {
        if (compositeDisposable == null || compositeDisposable.isDisposed()) {
            compositeDisposable = new CompositeDisposable();
        }
    }

    @Override
    public void dispose() {
        if (compositeDisposable != null && !compositeDisposable.isDisposed()) {
            compositeDisposable.dispose();
        }
    }
}
