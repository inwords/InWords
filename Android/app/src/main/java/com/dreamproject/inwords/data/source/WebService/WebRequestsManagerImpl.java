package com.dreamproject.inwords.data.source.WebService;

import com.dreamproject.inwords.data.entity.EntityIdentificator;
import com.dreamproject.inwords.data.entity.User;
import com.dreamproject.inwords.data.entity.UserCredentials;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.source.WebService.session.AuthInfo;
import com.dreamproject.inwords.data.source.WebService.session.SessionHelper;
import com.dreamproject.inwords.data.source.WebService.session.TokenResponse;
import com.dreamproject.inwords.data.sync.PullWordsAnswer;

import java.util.Arrays;
import java.util.List;

import javax.inject.Inject;

import io.reactivex.Maybe;
import io.reactivex.Single;
import io.reactivex.schedulers.Schedulers;
import okhttp3.Credentials;

public class WebRequestsManagerImpl implements WebRequestsManager {
    private WebApiService apiService;
    private SessionHelper sessionHelper;
    private AuthInfo authInfo;

    @Inject
    WebRequestsManagerImpl(WebApiService apiService, BasicAuthenticator authenticator, SessionHelper sessionHelper) {
        this.apiService = apiService;
        this.sessionHelper = sessionHelper;
        this.authInfo = new AuthInfo();

        authenticator.setOnUnauthorisedCallback(() -> getCredentials()
                .flatMap(s -> applyAuthSessionHelper(apiService.getToken(s))) //TODO COSTIL
                .blockingGet());
    }

    private Single<TokenResponse> setAuthToken(TokenResponse tokenResponse) {
        return Single.fromCallable(() -> {
            this.authInfo.setTokenResponse(tokenResponse);
            return tokenResponse;
        });
    }

    private Single<String> setCredentials(UserCredentials userCredentials) {
        return Single.fromCallable(() ->
        {
            authInfo.setCredentials(Credentials.basic(userCredentials.getEmail(), userCredentials.getPassword()));
            return authInfo.getCredentials();
        });
    }

    private Single<String> getCredentials() {
        return Single.fromCallable(() ->
                authInfo.getCredentials());
    }

    @Override
    public Single<TokenResponse> getToken(UserCredentials userCredentials) {
        return setCredentials(userCredentials)
                .flatMap(s -> applyAuthSessionHelper(apiService.getToken(s)))
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<TokenResponse> registerUser(UserCredentials userCredentials) {
        return applyAuthSessionHelper(apiService.registerUser(userCredentials))
                .zipWith(setCredentials(userCredentials), (tokenResponse, u) -> tokenResponse)
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<String> getLogin() {
        return applySessionHelper(apiService.getLogin(authInfo.getTokenResponse().getBearer()))
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<List<User>> getUsers() {
        return applySessionHelper(apiService.getUsers())
                //.flatMap(Observable::fromIterable)
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<User> addUser(User user) {
        return applySessionHelper(apiService.addUser(user))
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Maybe<List<WordTranslation>> getAllWords() { //TODO its a mock
        return Maybe.fromCallable(() -> {
            try {
                Thread.sleep(2000);
            } catch (Exception e) {
                e.printStackTrace();
            }

            return Arrays.asList(new WordTranslation("asd", "ку"), new WordTranslation("sdg", "укеу"));
        })
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<WordTranslation> insertWord(WordTranslation wordTranslation) { //TODO its a mock
        return Single.defer(() -> {
            Thread.sleep(2000);

            return Single.just(wordTranslation); //TODO
        })
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<List<EntityIdentificator>> insertAllWords(List<WordTranslation> wordTranslations) {
        return applySessionHelper(apiService.addPairs(authInfo.getTokenResponse().getBearer(), wordTranslations))
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<Integer> removeAllServerIds(List<Integer> serverIds) {
        return applySessionHelper(apiService.deletePairs(authInfo.getTokenResponse().getBearer(), serverIds))
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<PullWordsAnswer> pullWords(List<Integer> serverIds) {
        return applySessionHelper(apiService.pullWordsPairs(authInfo.getTokenResponse().getBearer(), serverIds))
                .subscribeOn(Schedulers.io());
    }

    private <T> Single<T> applySessionHelper(Single<T> query) {
        return sessionHelper
                .requireThreshold()
                .andThen(query)
                .doOnError(throwable -> sessionHelper.interceptError(throwable).blockingAwait());
    }

    private Single<TokenResponse> applyAuthSessionHelper(Single<TokenResponse> query) {
        return sessionHelper
                .resetThreshold()
                .andThen(query)
                .doOnError(throwable -> {
                    //noinspection ResultOfMethodCallIgnored
                    sessionHelper.interceptError(throwable)
                            .andThen(setAuthToken(TokenResponse.errorToken()))
                            .blockingGet();
                })
                .flatMap(this::setAuthToken);
    }
}
