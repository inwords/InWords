package com.dreamproject.inwords;

import android.view.MenuItem;

import io.reactivex.Observable;

public interface MainPresenter {
    void navigationItemSelectionHandler(Observable<MenuItem> bind);
    void dispose();
}
