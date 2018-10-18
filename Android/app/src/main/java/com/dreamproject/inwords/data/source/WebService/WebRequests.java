package com.dreamproject.inwords.data.source.WebService;

import com.dreamproject.inwords.data.entity.User;
import com.dreamproject.inwords.data.entity.UserCredentials;
import com.dreamproject.inwords.data.entity.WordIdentificator;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.sync.PullWordsAnswer;

import java.util.Arrays;
import java.util.List;

import io.reactivex.Maybe;
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

    private Single<AuthToken> getToken() {
        return apiService.getToken(authInfo.getCredentials())
                .subscribeOn(Schedulers.io())
                .doOnError(throwable -> setAuthToken(AuthToken.errorToken()))
                .doOnSuccess(this::setAuthToken);
    }

    public void setCredentials(UserCredentials userCredentials) {
        this.authInfo.setCredentials(Credentials.basic(userCredentials.getEmail(), userCredentials.getPassword()));
    }

    public Single<AuthToken> registerUser(UserCredentials userCredentials) {
        return apiService.registerUser(userCredentials)
                .subscribeOn(Schedulers.io())
                .doOnError(throwable -> setAuthToken(AuthToken.errorToken()))
                .doOnSuccess(this::setAuthToken);
    }

    public Single<AuthToken> updateToken() {
        return getToken();
    }

    public Single<String> getLogin() {
        return apiService.getLogin(authInfo.getAuthToken().getBearer())
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
        return apiService.addPairs(authInfo.getAuthToken().getBearer(), wordTranslations)
                .subscribeOn(Schedulers.io());
    }

    public Single<Integer> removeAllServerIds(List<Integer> serverIds) {
        return apiService.deletePairs(authInfo.getAuthToken().getBearer(), serverIds)
                .subscribeOn(Schedulers.io());
    }

    public Single<PullWordsAnswer> pullWords(List<Integer> serverIds) { //TODO its a mock
        return apiService.pullWordsPairs(authInfo.getAuthToken().getBearer(), serverIds)
                .subscribeOn(Schedulers.io());
    }
}
