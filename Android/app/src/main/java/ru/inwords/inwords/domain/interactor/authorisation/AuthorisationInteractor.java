package ru.inwords.inwords.domain.interactor.authorisation;

import io.reactivex.Completable;
import ru.inwords.inwords.data.dto.UserCredentials;

public interface AuthorisationInteractor {
    Completable signIn(UserCredentials userCredentials);

    Completable signUp(UserCredentials userCredentials);
}
