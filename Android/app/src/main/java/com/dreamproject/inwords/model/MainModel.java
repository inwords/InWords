package com.dreamproject.inwords.model;

import android.app.Application;

import com.dreamproject.inwords.data.entity.User;
import com.dreamproject.inwords.data.entity.UserCredentials;
import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.subjects.BehaviorSubject;

public interface MainModel {
    Completable presyncOnStart(Application application);

    Completable signIn(UserCredentials userCredentials);

    Completable signUp(UserCredentials userCredentials);

    Completable addWordTranslation(WordTranslation wordTranslation);

    Completable removeWordTranslation(WordTranslation wordTranslation);

    Completable trySyncAllReposWithCache();

    Observable<List<WordTranslation>> getAllWords();

    BehaviorSubject<User> getUsers();
}
