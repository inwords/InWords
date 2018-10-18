package com.dreamproject.inwords;

import io.reactivex.disposables.CompositeDisposable;

public class BasicPresenter implements BasePresenter {
    protected CompositeDisposable compositeDisposable;

    protected BasicPresenter() {
        compositeDisposable = new CompositeDisposable();
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
