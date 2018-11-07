package com.dreamproject.inwords.data.interactor.authorisation;

import com.dreamproject.inwords.data.entity.UserCredentials;
import com.dreamproject.inwords.data.source.WebService.AuthenticationError;
import com.dreamproject.inwords.data.source.WebService.TokenResponse;
import com.dreamproject.inwords.data.source.WebService.WebRequests;
import com.dreamproject.inwords.util.ErrorBodyFormatter;

import java.net.UnknownHostException;

import javax.inject.Inject;

import io.reactivex.Completable;
import io.reactivex.CompletableObserver;
import io.reactivex.Single;
import retrofit2.HttpException;

public class AuthorisationWebInteractor implements AuthorisationInteractor {
    private WebRequests webRequests;

    @Inject
    AuthorisationWebInteractor(WebRequests webRequests) {
        this.webRequests = webRequests;
    }

    @Override
    public Completable signIn(UserCredentials userCredentials) {
        return webRequests.setCredentials(userCredentials)
                .andThen(checkAuthToken(webRequests.getToken()));
    }

    @Override
    public Completable signUp(UserCredentials userCredentials) {
        return checkAuthToken(webRequests.registerUser(userCredentials));
    }

    private Completable checkAuthToken(Single<TokenResponse> authTokenSingle) {
        return authTokenSingle
                .onErrorResumeNext(e -> {
                    e.printStackTrace();

                    Throwable t;
                    if (e instanceof HttpException)
                        t = new AuthenticationError(ErrorBodyFormatter.getErrorMessage((HttpException) e));
                    else if (e instanceof UnknownHostException)
                        t = new RuntimeException("Network troubles");
                    else
                        t = new RuntimeException(e.getMessage());

                    return Single.error(t);

                })
                .flatMapCompletable(tokenResponse -> {
                    if (tokenResponse.isValid())
                        return CompletableObserver::onComplete;

                    return Completable.error(new RuntimeException("unhandled")); //TODO think
                });
    }
}
