package com.dreamproject.inwords.viewScenario.main;

import android.app.Application;

import com.dreamproject.inwords.BasicPresenter;

//compositeDisposable, model and application are available from BasicPresenter
public class MainPresenterImpl extends BasicPresenter implements MainPresenter {
    // Tag used for debugging/logging
    public static final String TAG = "MainPresenterImpl";

    private MainView mainView;

    public MainPresenterImpl(Application application, MainView mainView) {
        super(application);

        this.mainView = mainView;
    }



}
