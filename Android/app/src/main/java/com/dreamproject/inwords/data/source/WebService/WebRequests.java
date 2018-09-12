package com.dreamproject.inwords.data.source.WebService;

import com.dreamproject.inwords.data.entity.User;

import java.util.List;

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

}
