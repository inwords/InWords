package com.dreamproject.inwords;

import com.dreamproject.inwords.data.entity.User;

import io.reactivex.subjects.BehaviorSubject;

public interface MainModel {
    BehaviorSubject<User> getUsers();
}
