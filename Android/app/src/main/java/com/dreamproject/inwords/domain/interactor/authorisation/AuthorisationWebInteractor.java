package com.dreamproject.inwords.domain.interactor.authorisation;

import com.dreamproject.inwords.data.dto.UserCredentials;
import com.dreamproject.inwords.data.source.webService.AuthenticationError;
import com.dreamproject.inwords.data.source.webService.WebRequestsManager;
import com.dreamproject.inwords.data.source.webService.session.TokenResponse;
import com.dreamproject.inwords.domain.util.ErrorBodyFormatterKt;

import java.net.SocketTimeoutException;
import java.net.UnknownHostException;

import javax.inject.Inject;

import io.reactivex.Completable;
import io.reactivex.CompletableObserver;
import io.reactivex.Single;
import retrofit2.HttpException;

public class AuthorisationWebInteractor implements AuthorisationInteractor {
    private WebRequestsManager webRequestsManager;

    @Inject
    AuthorisationWebInteractor(WebRequestsManager webRequestsManager) {
        this.webRequestsManager = webRequestsManager;
    }

    @Override
    public Completable signIn(UserCredentials userCredentials) {
        return applyCheckAuthToken(webRequestsManager.getToken(userCredentials));
    }

    @Override
    public Completable signUp(UserCredentials userCredentials) {
        return applyCheckAuthToken(webRequestsManager.registerUser(userCredentials));
    }

    private Completable applyCheckAuthToken(Single<TokenResponse> authTokenSingle) {
        return authTokenSingle
                .onErrorResumeNext(e -> {
                    e.printStackTrace();

                    Throwable t;
                    if (e instanceof HttpException)
                        t = new AuthenticationError(ErrorBodyFormatterKt.getErrorMessage((HttpException) e));
                    else if (e instanceof UnknownHostException || e instanceof SocketTimeoutException)
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
