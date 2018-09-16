package com.dreamproject.inwords.data.source.WebService;

import com.dreamproject.inwords.data.entity.User;
import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.Arrays;
import java.util.List;

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

    private WebRequests() {
        apiService = WebApiService.Factory.create(BASE_API_URL);
    }

    public Single<User> addUser(User user) {
        return apiService.addUser(user)
                .subscribeOn(Schedulers.io());
    }

    public Observable<List<User>> getUsers() {
        return apiService.getUsers()
                //.flatMap(Observable::fromIterable)
                .subscribeOn(Schedulers.io());
    }

    public Maybe<List<WordTranslation>> getAllWords() {
        return Maybe.fromCallable(() -> {
            Thread.sleep(2000);
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
