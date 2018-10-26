package com.dreamproject.inwords.viewScenario.main;

import android.app.Application;

import com.dreamproject.inwords.BasicPresenter;

import io.reactivex.Observable;

//compositeDisposable, model and application are available from BasicPresenter
public class MainViewModel extends BasicPresenter implements MainPresenter {
    // Tag used for debugging/logging
    public static final String TAG = "MainViewModel";

    public MainViewModel(Application application) {
        super(application);
    }

    @Override
    public void onGetAllHandler(Observable<Object> obs) {
        compositeDisposable.add(
                obs.subscribe(o -> {
                    model.presyncOnStart().blockingGet();

                    model.trySyncAllReposWithCache().blockingGet();

                    compositeDisposable.add(
                            model.getAllWords().subscribe(System.out::println)
                    );
                }));
    }

}
