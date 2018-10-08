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
    void sync(Application application);

    Completable signIn(UserCredentials userCredentials);
    Completable signUp(UserCredentials userCredentials);
    Observable<List<WordTranslation>> getAllWords();
    BehaviorSubject<User> getUsers();
}
