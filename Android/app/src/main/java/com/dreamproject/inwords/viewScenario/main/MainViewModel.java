package com.dreamproject.inwords.viewScenario.main;

import android.content.Context;

import com.dreamproject.inwords.BasicViewModel;
import com.dreamproject.inwords.util.DependenciesComponent;

import io.reactivex.Observable;

//compositeDisposable, model and application are available from BasicPresenter
public class MainViewModel extends BasicViewModel {
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
