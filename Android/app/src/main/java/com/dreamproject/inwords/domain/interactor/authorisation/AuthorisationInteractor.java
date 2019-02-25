package com.dreamproject.inwords.domain.interactor.authorisation;

import com.dreamproject.inwords.data.dto.UserCredentials;

import io.reactivex.Completable;

public interface AuthorisationInteractor {
    Completable signIn(UserCredentials userCredentials);

    Completable signUp(UserCredentials userCredentials);
}
