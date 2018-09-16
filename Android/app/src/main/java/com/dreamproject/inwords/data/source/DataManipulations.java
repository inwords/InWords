package com.dreamproject.inwords.data.source;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;

public interface DataManipulations<T> {
    Observable<List<T>> get();

    Completable add(T value);

    Completable addAll(List<T> values);

    Completable remove(T value);
}
