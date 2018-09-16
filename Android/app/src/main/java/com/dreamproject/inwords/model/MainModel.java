package com.dreamproject.inwords.model;

import com.dreamproject.inwords.data.entity.User;

import io.reactivex.subjects.BehaviorSubject;

public interface MainModel {
    BehaviorSubject<User> getUsers();
}
