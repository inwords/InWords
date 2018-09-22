package com.dreamproject.inwords.data.source.WebService;

import com.dreamproject.inwords.data.entity.User;
import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;

import io.reactivex.Completable;
import io.reactivex.Maybe;
import io.reactivex.Observable;
import io.reactivex.Single;
import io.reactivex.schedulers.Schedulers;

import static com.dreamproject.inwords.AppConfig.BASE_API_URL;

public class WebRequests {
    // a simple static-field singleton
    public static final WebRequests INSTANCE = new WebRequests();

    private WebApiService apiService;

    private AuthInfo authInfo;

    private WebRequests() {
        authInfo = new AuthInfo();
        apiService = WebApiService.Factory.create(BASE_API_URL);
    }

    private void setAuthToken(AuthToken authToken) {
        this.authInfo.setAuthToken(authToken);
    }

    public void setCredentials(String credentials) {
        this.authInfo.setCredentials(credentials);
    }

    public AuthToken updateToken() {
        AuthToken authToken;
        try {
            authToken = getToken().blockingFirst();
        } catch (NoSuchElementException e) {
            authToken = new AuthToken("error_token", "error_mail"); //TODO: think
            e.printStackTrace();
        }
        setAuthToken(authToken);

        return authToken;
    }

    public Completable registerUser(TemporaryUser temporaryUser) {
        return apiService.registerUser(temporaryUser)
                .subscribeOn(Schedulers.io())
                .doOnNext(this::setAuthToken)
                .ignoreElements(); //TODO security leak? )0)
    }

    private Observable<AuthToken> getToken() {
        return apiService.getToken(authInfo.getCredentials())
                .subscribeOn(Schedulers.io());
    }

    public Observable<String> getLogin() {
        return apiService.getLogin(authInfo.getAuthToken().getBearer())
                .subscribeOn(Schedulers.io());
    }

    public Observable<List<User>> getUsers() {
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

    public Completable insertWord(WordTranslation wordTranslation) {
        return Completable.fromCallable(() -> {
            Thread.sleep(2000);
            return true;
        })
                .subscribeOn(Schedulers.io());
    }

    public Completable insertAllWords(List<WordTranslation> wordTranslations) {
        return Completable.fromCallable(() -> {
            Thread.sleep(2000);
            return true;
        })
                .subscribeOn(Schedulers.io());
    }


}
