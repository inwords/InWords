package com.dreamproject.inwords;

import android.app.Application;

import com.dreamproject.inwords.data.entity.User;
import com.dreamproject.inwords.data.source.WebService.WebRequests;
import com.dreamproject.inwords.data.source.database.AppRoomDatabase;
import com.dreamproject.inwords.data.source.database.UserDao;

import java.util.List;

import io.reactivex.Flowable;
import io.reactivex.Observable;
import io.reactivex.disposables.Disposable;
import io.reactivex.schedulers.Schedulers;
import io.reactivex.subjects.BehaviorSubject;

public class MainModelImpl implements MainModel {
    // Tag used for debugging/logging
    public static final String TAG = "MainModelImpl";

    private static MainModelImpl INSTANCE;

    private Application application;

    private WebRequests webRequests;
    private UserDao userDao;

    //data flow between model and view (reemits last element on new subscription)
    private BehaviorSubject<User> userBehaviorSubject;

    public static MainModelImpl getInstance(final Application application) {
        if (INSTANCE == null) {
            synchronized (MainModelImpl.class) {
                if (INSTANCE == null) {
                    INSTANCE = new MainModelImpl(application);
                }
            }
        }
        return INSTANCE;
    }

    private MainModelImpl(Application application) {
        this.application = application;

        AppRoomDatabase db = AppRoomDatabase.getDatabase(application);

        webRequests = WebRequests.INSTANCE;
        userDao = db.userDao();

        userBehaviorSubject = BehaviorSubject.create();
    }

    void addUser() //TODO for example only; remove later
    {
        User user = new User(0, "Vasilii", "Shumilov", null, "12345", "eeeerock");
        Disposable d = webRequests.addUser(user).subscribe(System.out::println, Throwable::printStackTrace);
    }

    public BehaviorSubject<User> getUsers() { //TODO for example only; remove later
        Disposable d = loadUsersFromRemoteSource()
                .onErrorResumeNext(loadUsersFromLocalSource().toObservable()) //костыль
                .flatMap(Observable::fromIterable)
                .subscribe(userBehaviorSubject::onNext); //Вся эта тема с BehaviourSubject для того, чтобы поток не прерывался при ошибке

        return userBehaviorSubject;
    }

    private Observable<List<User>> loadUsersFromRemoteSource() { //TODO for example only; remove later
        return webRequests.getUsers(); //by default subscribes on Schedulers.io()
    }

    private Flowable<List<User>> loadUsersFromLocalSource() { //TODO for example only; remove later
        return userDao.getUsers()
                .subscribeOn(Schedulers.io());
    }
}
