package com.dreamproject.inwords.model;

import android.app.Application;

import com.dreamproject.inwords.data.entity.User;
import com.dreamproject.inwords.data.entity.UserCredentials;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsCacheRepository;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsDatabaseRepository;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsLocalRepository;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsMainRepository;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsProvider;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsRemoteRepository;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsWebApiRepository;
import com.dreamproject.inwords.data.source.WebService.AuthorisationInteractor;
import com.dreamproject.inwords.data.source.WebService.AuthorisationWebInteractor;
import com.dreamproject.inwords.data.source.WebService.WebRequests;
import com.dreamproject.inwords.data.sync.SyncController;

import java.util.Collections;
import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.schedulers.Schedulers;
import io.reactivex.subjects.BehaviorSubject;

public class MainModelImpl implements MainModel {
    // Tag used for debugging/logging
    public static final String TAG = "MainModelImpl";

    private static MainModelImpl INSTANCE;

    private TranslationWordsLocalRepository inMemoryRepository;

    private TranslationWordsProvider translationWordsProvider;
    private AuthorisationInteractor authorisationInteractor;

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
        userBehaviorSubject = BehaviorSubject.create();

        WebRequests webRequests = WebRequests.INSTANCE;

        authorisationInteractor = new AuthorisationWebInteractor(webRequests);
        //signIn(new UserCredentials("admin@mail.ru", "asdasd")).blockingGet();

        inMemoryRepository = new TranslationWordsCacheRepository();

        translationWordsProvider = new TranslationWordsMainRepository(application, inMemoryRepository);


        /*webRequests.getToken(Credentials.basic("mail@mail.ru", "qwerty")).subscribe(authToken -> System.out.println(authToken.getAccessToken()),
                Throwable::printStackTrace);*/

        /*Throwable t = webRequests.registerUser(new UserCredentials("mail2@mail.ru", "qwerty")).blockingGet();
        if (t != null)
            t.printStackTrace();*/

        /*webRequests.setCredentials(new UserCredentials("mail@mail.ru", "qwerty"));

        webRequests.getLogin()
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

    @Override
    public void sync(Application application) {
        TranslationWordsLocalRepository localRepository = new TranslationWordsDatabaseRepository(application);
        TranslationWordsRemoteRepository remoteRepository = new TranslationWordsWebApiRepository();

        SyncController syncController = new SyncController(inMemoryRepository, localRepository, remoteRepository);

        localRepository.getList().flatMapSingle(inMemoryRepository::addAll).blockingFirst();

        Throwable throwable = syncController.presyncOnStart()
                .doOnError(Throwable::printStackTrace)
                .ignoreElement()
                .blockingGet();
        if (throwable != null)
            throwable.printStackTrace();

        syncController.trySyncAllReposWithCache()
                .subscribeOn(Schedulers.io())
                .blockingFirst();
    }

    public Completable signIn(UserCredentials userCredentials) {
        return authorisationInteractor.signIn(userCredentials);
    }

    public Completable signUp(UserCredentials userCredentials) {
        return authorisationInteractor.signUp(userCredentials);
    }

    public Observable<List<WordTranslation>> getAllWords() {
        return translationWordsProvider.getList().map(wordTranslations ->
                Observable.fromIterable(wordTranslations)
                        .filter(wordTranslation -> wordTranslation.getServerId() >= 0)
                        .toList()
                        .onErrorReturnItem(Collections.emptyList()) //TODO think
                        .blockingGet());
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
