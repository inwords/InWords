package com.dreamproject.inwords.data.repository;

import io.reactivex.Completable;
import io.reactivex.Observable;

public interface DataManipulations<T> {
    Observable<T> get();

    Completable add(T value);

    Completable remove(T value);
}
