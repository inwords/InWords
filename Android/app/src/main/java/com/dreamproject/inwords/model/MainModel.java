package com.dreamproject.inwords.model;

import com.dreamproject.inwords.data.entity.User;
import com.dreamproject.inwords.data.source.WebService.TemporaryUser;

import io.reactivex.Completable;
import io.reactivex.subjects.BehaviorSubject;

public interface MainModel {
    Completable logIn(TemporaryUser temporaryUser);
    BehaviorSubject<User> getUsers();
}
