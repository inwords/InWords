package com.dreamproject.inwords.model;

import com.dreamproject.inwords.data.entity.User;
import com.dreamproject.inwords.data.source.WebService.UserCredentials;

import io.reactivex.Completable;
import io.reactivex.subjects.BehaviorSubject;

public interface MainModel {
    Completable logIn(UserCredentials userCredentials);
    BehaviorSubject<User> getUsers();
}
