package com.dreamproject.inwords.data.source.WebService;

import com.dreamproject.inwords.data.entity.User;
import com.dreamproject.inwords.data.entity.UserCredentials;
import com.dreamproject.inwords.data.entity.EntityIdentificator;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.sync.PullWordsAnswer;

import java.util.Arrays;
import java.util.List;

import javax.inject.Inject;

import io.reactivex.Maybe;
import io.reactivex.Single;
import io.reactivex.schedulers.Schedulers;
import okhttp3.Credentials;

public class WebRequestsImpl implements WebRequests {
    private WebApiService apiService;

    private AuthInfo authInfo;

    @Inject
    WebRequestsImpl(WebApiService apiService, BasicAuthenticator authenticator) {
        this.authInfo = new AuthInfo();
        this.apiService = apiService;

        authenticator.setOnUnauthorisedCallback(() -> updateToken() //TODO COSTIL
                .onErrorReturnItem(TokenResponse.errorToken())
                .blockingGet());
    }

    private void setAuthToken(TokenResponse tokenResponse) {
        this.authInfo.setTokenResponse(tokenResponse);
    }

    private Single<TokenResponse> getToken() {
        return apiService.getToken(authInfo.getCredentials())
                .subscribeOn(Schedulers.io())
                .doOnError(throwable -> setAuthToken(TokenResponse.errorToken()))
                .doOnSuccess(this::setAuthToken);
    }

    @Override
    public void setCredentials(UserCredentials userCredentials) {
        this.authInfo.setCredentials(Credentials.basic(userCredentials.getEmail(), userCredentials.getPassword()));
    }

    @Override
    public Single<TokenResponse> registerUser(UserCredentials userCredentials) {
        return apiService.registerUser(userCredentials)
                .subscribeOn(Schedulers.io())
                .doOnError(throwable -> setAuthToken(TokenResponse.errorToken()))
                .doOnSuccess(this::setAuthToken);
    }

    @Override
    public Single<TokenResponse> updateToken() {
        return getToken();
    }

    @Override
    public Single<String> getLogin() {
        return apiService.getLogin(authInfo.getTokenResponse().getBearer())
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<List<User>> getUsers() {
        return apiService.getUsers()
                //.flatMap(Observable::fromIterable)
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<User> addUser(User user) {
        return apiService.addUser(user)
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Maybe<List<WordTranslation>> getAllWords() {
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
    public Single<WordTranslation> insertWord(WordTranslation wordTranslation) {
        return Single.defer(() -> {
            Thread.sleep(2000);

            return Single.just(wordTranslation); //TODO
        })
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<List<EntityIdentificator>> insertAllWords(List<WordTranslation> wordTranslations) {
        return apiService.addPairs(authInfo.getTokenResponse().getBearer(), wordTranslations)
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<Integer> removeAllServerIds(List<Integer> serverIds) {
        return apiService.deletePairs(authInfo.getTokenResponse().getBearer(), serverIds)
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<PullWordsAnswer> pullWords(List<Integer> serverIds) {
        return apiService.pullWordsPairs(authInfo.getTokenResponse().getBearer(), serverIds)
                .subscribeOn(Schedulers.io());
    }
}
