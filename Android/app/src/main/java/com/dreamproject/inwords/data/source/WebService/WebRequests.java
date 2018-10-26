package com.dreamproject.inwords.data.source.WebService;

import com.dreamproject.inwords.data.entity.User;
import com.dreamproject.inwords.data.entity.UserCredentials;
import com.dreamproject.inwords.data.entity.WordIdentificator;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.sync.PullWordsAnswer;

import java.util.Arrays;
import java.util.List;

import javax.inject.Inject;

import io.reactivex.Maybe;
import io.reactivex.Single;
import io.reactivex.schedulers.Schedulers;
import okhttp3.Credentials;

public class WebRequests {
    private WebApiService apiService;

    private AuthInfo authInfo;

    @Inject
    public WebRequests(WebApiService apiService, BasicAuthenticator authenticator) {
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

    public void setCredentials(UserCredentials userCredentials) {
        this.authInfo.setCredentials(Credentials.basic(userCredentials.getEmail(), userCredentials.getPassword()));
    }

    public Single<TokenResponse> registerUser(UserCredentials userCredentials) {
        return apiService.registerUser(userCredentials)
                .subscribeOn(Schedulers.io())
                .doOnError(throwable -> setAuthToken(TokenResponse.errorToken()))
                .doOnSuccess(this::setAuthToken);
    }

    public Single<TokenResponse> updateToken() {
        return getToken();
    }

    public Single<String> getLogin() {
        return apiService.getLogin(authInfo.getTokenResponse().getBearer())
                .subscribeOn(Schedulers.io());
    }

    public Single<List<User>> getUsers() {
        return apiService.getUsers()
                //.flatMap(Observable::fromIterable)
                .subscribeOn(Schedulers.io());
    }

    public Single<User> addUser(User user) {
        return apiService.addUser(user)
                .subscribeOn(Schedulers.io());
    }

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

    public Single<WordTranslation> insertWord(WordTranslation wordTranslation) {
        return Single.defer(() -> {
            Thread.sleep(2000);

            return Single.just(wordTranslation); //TODO
        })
                .subscribeOn(Schedulers.io());
    }

    public Single<List<WordIdentificator>> insertAllWords(List<WordTranslation> wordTranslations) {
        return apiService.addPairs(authInfo.getTokenResponse().getBearer(), wordTranslations)
                .subscribeOn(Schedulers.io());
    }

    public Single<Integer> removeAllServerIds(List<Integer> serverIds) {
        return apiService.deletePairs(authInfo.getTokenResponse().getBearer(), serverIds)
                .subscribeOn(Schedulers.io());
    }

    public Single<PullWordsAnswer> pullWords(List<Integer> serverIds) { //TODO its a mock
        return apiService.pullWordsPairs(authInfo.getTokenResponse().getBearer(), serverIds)
                .subscribeOn(Schedulers.io());
    }
}
