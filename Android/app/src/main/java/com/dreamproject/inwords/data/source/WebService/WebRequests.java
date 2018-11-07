package com.dreamproject.inwords.data.source.WebService;

import com.dreamproject.inwords.data.entity.User;
import com.dreamproject.inwords.data.entity.UserCredentials;
import com.dreamproject.inwords.data.entity.EntityIdentificator;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.sync.PullWordsAnswer;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Maybe;
import io.reactivex.Single;

public interface WebRequests {
    Completable setCredentials(UserCredentials userCredentials);

    Single<TokenResponse> registerUser(UserCredentials userCredentials);

    Single<TokenResponse> updateToken();

    Single<String> getLogin();

    Single<List<User>> getUsers();

    Single<User> addUser(User user);

    Maybe<List<WordTranslation>> getAllWords();

    Single<WordTranslation> insertWord(WordTranslation wordTranslation);

    Single<List<EntityIdentificator>> insertAllWords(List<WordTranslation> wordTranslations);

    Single<Integer> removeAllServerIds(List<Integer> serverIds);

    Single<PullWordsAnswer> pullWords(List<Integer> serverIds);
}
