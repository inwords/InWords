package com.dreamproject.inwords.viewScenario.main;

import io.reactivex.Observable;

public interface MainPresenter {
    void dispose();
    void getAllHandler(Observable<Object> obs);
}
