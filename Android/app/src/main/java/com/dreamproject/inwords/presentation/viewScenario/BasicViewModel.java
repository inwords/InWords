package com.dreamproject.inwords.presentation.viewScenario;

import androidx.lifecycle.ViewModel;
import io.reactivex.disposables.CompositeDisposable;

public class BasicViewModel extends ViewModel {
    protected CompositeDisposable compositeDisposable;

    protected BasicViewModel() {
        this.compositeDisposable = new CompositeDisposable();
    }

    @Override
    protected void onCleared() {
        compositeDisposable.dispose();
        compositeDisposable.clear();
    }
}
