package com.dreamproject.inwords.model;

import android.app.Application;

import com.dreamproject.inwords.data.entity.User;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.source.repository.RepositoryController;
import com.dreamproject.inwords.data.source.repository.TranslationWordsCacheRepository;
import com.dreamproject.inwords.data.source.repository.TranslationWordsLocalRepository;
import com.dreamproject.inwords.data.source.repository.TranslationWordsRemoteRepository;

import java.util.List;

import io.reactivex.Observable;
import io.reactivex.subjects.BehaviorSubject;

public class MainModelImpl implements MainModel {
    // Tag used for debugging/logging
    public static final String TAG = "MainModelImpl";

    private static MainModelImpl INSTANCE;

    private RepositoryController<WordTranslation> translationWordsRepository;

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
        translationWordsRepository = new RepositoryController<>(
                new TranslationWordsCacheRepository(),
                new TranslationWordsLocalRepository(application),
                new TranslationWordsRemoteRepository()
        );

        userBehaviorSubject = BehaviorSubject.create();

        getAllWords()
                .subscribe(wordTranslations -> System.out.println(wordTranslations));
    }

    public Observable<List<WordTranslation>> getAllWords() {
        return translationWordsRepository.get();
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
