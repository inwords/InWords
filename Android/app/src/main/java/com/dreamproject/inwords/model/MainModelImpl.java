package com.dreamproject.inwords.model;

import android.app.Application;

import com.dreamproject.inwords.data.entity.User;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsRepository;
import com.dreamproject.inwords.data.source.WebService.AuthToken;
import com.dreamproject.inwords.data.source.WebService.AuthenticationError;
import com.dreamproject.inwords.data.source.WebService.TemporaryUser;
import com.dreamproject.inwords.data.source.WebService.WebRequests;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.subjects.BehaviorSubject;

public class MainModelImpl implements MainModel {
    // Tag used for debugging/logging
    public static final String TAG = "MainModelImpl";

    private static MainModelImpl INSTANCE;

    private TranslationWordsRepository translationWordsRepository;

    //data flow between model and view (reemits last element on new subscription)
    private BehaviorSubject<User> userBehaviorSubject;

    WebRequests webRequests;

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
        userBehaviorSubject = BehaviorSubject.create();
        webRequests = WebRequests.INSTANCE;

        //translationWordsRepository = new TranslationWordsMainRepository(application);

        /*WebRequests.INSTANCE.getToken(Credentials.basic("mail@mail.ru", "qwerty")).subscribe(authToken -> System.out.println(authToken.getAccessToken()),
                Throwable::printStackTrace);*/

        /*Throwable t = WebRequests.INSTANCE.registerUser(new TemporaryUser("mail2@mail.ru", "qwerty")).blockingGet();
        if (t != null)
            t.printStackTrace();*/

        /*WebRequests.INSTANCE.setCredentials(new TemporaryUser("mail@mail.ru", "qwerty"));

        WebRequests.INSTANCE.getLogin()
                .subscribe(str -> System.out.println(str),
                        Throwable::printStackTrace);*/
        /*try {
            Thread.sleep(4000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }*/

        /*getAllWords()
                .observeOn(Schedulers.io())
                .subscribe(wordTranslations -> System.out.println(wordTranslations));*/
    }

    public Completable logIn(TemporaryUser temporaryUser) {
        return Completable.create((emitter) -> {
            webRequests.setCredentials(temporaryUser);
            AuthToken authToken = webRequests.updateToken();

            if (authToken.isValid())
                emitter.onComplete();
            else
                emitter.onError(new AuthenticationError());
        });
    }

    public Observable<List<WordTranslation>> getAllWords() {
        return translationWordsRepository.getList();
    }

    void addUser() //TODO for example only; remove later
    {
        User user = new User(0, "Vasilii", "Shumilov", null, "12345", "eeeerock");
        //Disposable d = webRequests.addUser(user).subscribe(System.out::println, Throwable::printStackTrace);
    }

    public BehaviorSubject<User> getUsers() { //TODO for example only; remove later
        /*Disposable d = loadUsersFromRemoteSource()
                .onErrorResumeNext(loadUsersFromLocalSource().toObservable()) //костыль
                .flatMap(Observable::fromIterable)
                .subscribe(userBehaviorSubject::onNext); *///Вся эта тема с BehaviourSubject для того, чтобы поток не прерывался при ошибке

        return userBehaviorSubject;
    }
}
