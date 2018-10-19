package com.dreamproject.inwords.viewScenario.main;

import android.content.Context;

import com.dreamproject.inwords.BasicModelPresenter;
import com.dreamproject.inwords.model.TranslationModel;
import com.dreamproject.inwords.util.DependenciesComponent;

import io.reactivex.Observable;

//compositeDisposable, model and application are available from BasicPresenter
public class MainViewModel extends BasicModelPresenter<TranslationModel> implements MainPresenter {
    // Tag used for debugging/logging
    public static final String TAG = "MainViewModel";

    public MainViewModel(Context context) {
        super(DependenciesComponent.getTranslationModelInstance(context));
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
