package com.dreamproject.inwords.data.source.webService;

import com.dreamproject.inwords.core.util.SchedulersFacade;
import com.dreamproject.inwords.data.dto.EntityIdentificator;
import com.dreamproject.inwords.data.dto.User;
import com.dreamproject.inwords.data.dto.UserCredentials;
import com.dreamproject.inwords.data.dto.WordTranslation;
import com.dreamproject.inwords.data.dto.game.Game;
import com.dreamproject.inwords.data.dto.game.GameInfo;
import com.dreamproject.inwords.data.dto.game.GameLevel;
import com.dreamproject.inwords.data.dto.game.GameLevelInfo;
import com.dreamproject.inwords.data.source.webService.session.AuthInfo;
import com.dreamproject.inwords.data.source.webService.session.SessionHelper;
import com.dreamproject.inwords.data.source.webService.session.TokenResponse;
import com.dreamproject.inwords.data.sync.PullWordsAnswer;

import java.util.Arrays;
import java.util.List;

import javax.inject.Inject;

import io.reactivex.Maybe;
import io.reactivex.Single;
import io.reactivex.schedulers.Schedulers;

public class WebRequestsManagerImpl implements WebRequestsManager {
    private WebApiService apiService;
    private SessionHelper sessionHelper;
    private AuthInfo authInfo;

    @Inject
    WebRequestsManagerImpl(WebApiService apiService, BasicAuthenticator authenticator, SessionHelper sessionHelper) {
        this.apiService = apiService;
        this.sessionHelper = sessionHelper;
        this.authInfo = new AuthInfo();

        authenticator.setOnUnauthorisedCallback(() -> getCredentials()
                .flatMap(credentials -> applyAuthSessionHelper(apiService.getToken(credentials))) //TODO COSTIL
                .blockingGet());
    }

    private Single<TokenResponse> setAuthToken(TokenResponse tokenResponse) {
        return Single.fromCallable(() -> {
            this.authInfo.setTokenResponse(tokenResponse);
            return tokenResponse;
        });
    }

    private Single<UserCredentials> setCredentials(UserCredentials userCredentials) {
        return Single.fromCallable(() ->
        {
            authInfo.setCredentials(userCredentials);
            return authInfo.getCredentials();
        });
    }

    private Single<UserCredentials> getCredentials() {
        return Single.fromCallable(() ->
                authInfo.getCredentials());
    }

    @Override
    public Single<TokenResponse> getToken(UserCredentials userCredentials) {
        return setCredentials(userCredentials)
                .flatMap(s -> applyAuthSessionHelper(apiService.getToken(s)))
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<TokenResponse> registerUser(UserCredentials userCredentials) {
        return applyAuthSessionHelper(apiService.registerUser(userCredentials))
                .zipWith(setCredentials(userCredentials), (tokenResponse, u) -> tokenResponse)
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<String> getLogin() {
        return applySessionHelper(apiService.getLogin(authInfo.getTokenResponse().getBearer()))
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<List<User>> getUsers() {
        return applySessionHelper(apiService.getUsers())
                //.flatMap(Observable::fromIterable)
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<User> addUser(User user) {
        return applySessionHelper(apiService.addUser(user))
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Maybe<List<WordTranslation>> getAllWords() { //TODO its a mock
        return Maybe.fromCallable(() -> {
            try {
                Thread.sleep(2000);
            } catch (Exception e) {
                e.printStackTrace();
            }

            return Arrays.asList(new WordTranslation("asd", "ку"), new WordTranslation("sdg", "укеу"));
        })
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<WordTranslation> insertWord(WordTranslation wordTranslation) { //TODO its a mock
        return Single.defer(() -> {
            Thread.sleep(2000);

            return Single.just(wordTranslation); //TODO
        })
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<List<EntityIdentificator>> insertAllWords(List<WordTranslation> wordTranslations) {
        return applySessionHelper(apiService.addPairs(authInfo.getTokenResponse().getBearer(), wordTranslations))
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<Integer> removeAllServerIds(List<Integer> serverIds) {
        return applySessionHelper(apiService.deletePairs(authInfo.getTokenResponse().getBearer(), serverIds))
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<PullWordsAnswer> pullWords(List<Integer> serverIds) {
        return applySessionHelper(apiService.pullWordsPairs(authInfo.getTokenResponse().getBearer(), serverIds))
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<List<GameInfo>> getGameInfos() {
        return applySessionHelper(apiService.getGameInfos(authInfo.getTokenResponse().getBearer()))
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<Game> getGame(int gameId) {
        return Single.just(new Game(gameId, "creator", Arrays.asList(
                new GameLevelInfo(0, "Introduction", 2, 3, 3, true),
                new GameLevelInfo(1, "Beginning", 0, 3, 3, false),
                new GameLevelInfo(2, "Super level", 5, 3, 5, true),
                new GameLevelInfo(3, "Extra notes", 2, 3, 5, false))));

//        return applySessionHelper(apiService.getGame(authInfo.getTokenResponse().getBearer(), gameId))
//                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<GameLevel> getLevel(int levelId) {
        return Single.just(new GameLevel(levelId, Arrays.asList(new WordTranslation("car", "мошина"),
                new WordTranslation("box", "каропка"),
                new WordTranslation("plane", "самолёт"),
                new WordTranslation("bath", "ванна"))));

//        return applySessionHelper(apiService.getLevel(authInfo.getTokenResponse().getBearer(), levelId))
//                .subscribeOn(SchedulersFacade.io());
    }

    private <T> Single<T> applySessionHelper(Single<T> query) {
        return sessionHelper
                .requireThreshold()
                .andThen(query)
                .doOnError(throwable -> sessionHelper.interceptError(throwable).blockingAwait());
    }

    private Single<TokenResponse> applyAuthSessionHelper(Single<TokenResponse> query) {
        return sessionHelper
                .resetThreshold()
                .andThen(query)
                .doOnError(throwable -> {
                    //noinspection ResultOfMethodCallIgnored
                    sessionHelper.interceptError(throwable)
                            .andThen(setAuthToken(TokenResponse.errorToken()))
                            .blockingGet();
                })
                .flatMap(this::setAuthToken);
    }
}
