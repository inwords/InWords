package com.dreamproject.inwords;

import android.annotation.SuppressLint;
import android.app.Application;
import android.util.Log;
import android.view.MenuItem;

import io.reactivex.Observable;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.disposables.Disposable;

public class MainPresenterImpl implements MainPresenter {
    // Tag used for debugging/logging
    public static final String TAG = "MainPresenterImpl";

    private CompositeDisposable compositeDisposable;

    private MainView mainView;
    private MainModel mainModel;

    public MainPresenterImpl(Application application, MainView mainView) {

        compositeDisposable = new CompositeDisposable();

        this.mainView = mainView;
        this.mainModel = MainModelImpl.getInstance(application);
    }

    @SuppressLint("CheckResult")
    @Override
    public void navigationItemSelectionHandler(Observable<MenuItem> obs) {
        obs.subscribe(menuItem -> {
            switch (menuItem.getItemId()) {
                case R.id.mainFragment:
                    //mainView.navigateToHome();

                    Disposable disposable = mainModel.getUsers()
                            .observeOn(AndroidSchedulers.mainThread())
                            .subscribe(user -> mainView.appendText(user.getUserName() + "\n")
                                    ,
                                    e -> mainView.showText(e.getMessage()));

                    compositeDisposable.add(disposable);
                    break;

                case R.id.loginFragment:
                    //mainView.navigateToLogin();
                    break;
                case R.id.navigation_notifications:
                    mainView.showTextNotifications();
                    break;

                default:
                    Log.d(TAG, "Selected BottomNavigationView unexciting menu item");
            }
        });
    }

    @Override
    public void dispose() {
        if (compositeDisposable != null && compositeDisposable.isDisposed()) {
            compositeDisposable.dispose();
        }
    }
}
