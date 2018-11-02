package com.dreamproject.inwords.data.interactor.authorisation;

import com.dreamproject.inwords.data.entity.UserCredentials;

import io.reactivex.Completable;

public interface AuthorisationInteractor {
    Completable signIn(UserCredentials userCredentials);

    Completable signUp(UserCredentials userCredentials);
}
