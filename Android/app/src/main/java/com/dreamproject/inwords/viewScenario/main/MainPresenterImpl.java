package com.dreamproject.inwords.viewScenario.main;

import android.app.Application;

import com.dreamproject.inwords.BasicPresenter;

import io.reactivex.Observable;
import io.reactivex.disposables.Disposable;

//compositeDisposable, model and application are available from BasicPresenter
public class MainPresenterImpl extends BasicPresenter implements MainPresenter {
    // Tag used for debugging/logging
    public static final String TAG = "MainPresenterImpl";

    private MainView mainView;

    public MainPresenterImpl(Application application, MainView mainView) {
        super(application);

        this.mainView = mainView;
    }

    @Override
    public void getAllHandler(Observable<Object> obs) {
        Disposable d = model.getAllWords().subscribe(System.out::println);
    }

}
