package com.dreamproject.inwords.data.source.WebService;

import com.dreamproject.inwords.data.entity.User;
import com.dreamproject.inwords.data.entity.UserCredentials;
import com.dreamproject.inwords.data.entity.WordIdentificator;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.sync.PresyncServerAnswer;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

import io.reactivex.Completable;
import io.reactivex.Maybe;
import io.reactivex.Observable;
import io.reactivex.Single;
import io.reactivex.schedulers.Schedulers;
import okhttp3.Credentials;

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

    public void setCredentials(UserCredentials userCredentials) {
        this.authInfo.setCredentials(Credentials.basic(userCredentials.getEmail(), userCredentials.getPassword()));
    }

    public AuthToken updateToken() {
        AuthToken authToken;
        try {
            authToken = getToken()
                    //.onErrorReturnItem(new AuthToken("error_token", "error_mail"))
                    .blockingFirst();
        } catch (NoSuchElementException e) {
            authToken = new AuthToken("error_token", "error_mail"); //TODO: think
            e.printStackTrace();
        }
        setAuthToken(authToken);

        return authToken;
    }

    public Completable registerUser(UserCredentials userCredentials) {
        return apiService.registerUser(userCredentials)
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

    public Single<WordTranslation> insertWord(WordTranslation wordTranslation) {
        return Single.defer(() -> {
            Thread.sleep(2000);

            return Single.just(wordTranslation); //TODO
        })
                .subscribeOn(Schedulers.io());
    }

    public Single<List<WordIdentificator>> insertAllWords(List<WordTranslation> wordTranslations) {
        return Single.defer(() -> {
            Thread.sleep(2000);

            return Single.just(wordTranslations)
                    .flatMapObservable(Observable::fromIterable)
                    .cast(WordIdentificator.class)
                    .toList(); //TODO
        })
                .subscribeOn(Schedulers.io());
    }

    public Observable<PresyncServerAnswer> getPresyncData() { //TODO its a mock
        return Observable.fromCallable(() -> {
            try {
                Thread.sleep(2000);
            } catch (Exception e) {
                e.printStackTrace();
            }

            return new PresyncServerAnswer(Collections.singletonList(12), Arrays.asList(
                    new WordTranslation(1, 12, "asd", "ку"),
                    new WordTranslation(3, 14, "asdddd", "qwe"),
                    new WordTranslation(2, 13, "sdg", "укеу")));
        })
                .subscribeOn(Schedulers.io());
    }
}
