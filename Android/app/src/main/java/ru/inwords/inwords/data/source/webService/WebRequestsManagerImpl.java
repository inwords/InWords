package ru.inwords.inwords.data.source.webService;

import java.util.List;

import javax.inject.Inject;

import io.reactivex.Single;
import io.reactivex.schedulers.Schedulers;
import ru.inwords.inwords.core.util.Function;
import ru.inwords.inwords.core.util.SchedulersFacade;
import ru.inwords.inwords.data.dto.EntityIdentificator;
import ru.inwords.inwords.data.dto.User;
import ru.inwords.inwords.data.dto.UserCredentials;
import ru.inwords.inwords.data.dto.WordTranslation;
import ru.inwords.inwords.data.dto.game.Game;
import ru.inwords.inwords.data.dto.game.GameInfo;
import ru.inwords.inwords.data.dto.game.GameLevel;
import ru.inwords.inwords.data.dto.game.LevelScore;
import ru.inwords.inwords.data.dto.game.LevelScoreRequest;
import ru.inwords.inwords.data.source.webService.session.AuthInfo;
import ru.inwords.inwords.data.source.webService.session.AuthInfoKt;
import ru.inwords.inwords.data.source.webService.session.SessionHelper;
import ru.inwords.inwords.data.source.webService.session.TokenResponse;
import ru.inwords.inwords.data.sync.PullWordsAnswer;

public class WebRequestsManagerImpl implements WebRequestsManager {
    private final WebApiService apiService;
    private final SessionHelper sessionHelper;

    private final AuthInfo authInfo;

    @Inject
    WebRequestsManagerImpl(WebApiService apiService, BasicAuthenticator authenticator, SessionHelper sessionHelper, AuthInfo authInfo) {
        this.apiService = apiService;
        this.sessionHelper = sessionHelper;
        this.authInfo = authInfo;

        authenticator.setOnUnauthorisedCallback(() -> getToken().blockingGet()); //TODO COSTIL
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
        return Single.fromCallable(authInfo::getCredentials);
    }

    private Single<TokenResponse> getToken() {
        return getCredentials()
                .filter(AuthInfoKt::validCredentials)
                .toSingle()
                .flatMap(s -> applyAuthSessionHelper(apiService.getToken(s)))
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<TokenResponse> getToken(UserCredentials userCredentials) {
        return setCredentials(userCredentials)
                .filter(AuthInfoKt::validCredentials)
                .toSingle()
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
        return applySessionHelper(apiService::getLogin)
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<User> getAuthorisedUser() {
        return applySessionHelper(apiService::getAuthorisedUser)
                //.flatMap(Observable::fromIterable)
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<User> getUserById(int id) {
        return applySessionHelper(b -> apiService.getUserById(b, id))
                //.flatMap(Observable::fromIterable)
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<List<EntityIdentificator>> insertAllWords(List<WordTranslation> wordTranslations) {
        return applySessionHelper(b -> apiService.addPairs(b, wordTranslations))
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<Integer> removeAllServerIds(List<Integer> serverIds) {
        return applySessionHelper(b -> apiService.deletePairs(b, serverIds))
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<PullWordsAnswer> pullWords(List<Integer> serverIds) {
        return applySessionHelper(b -> apiService.pullWordsPairs(b, serverIds))
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<List<GameInfo>> getGameInfos() {
        return applySessionHelper(apiService::getGameInfos)
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<Game> getGame(int gameId) {
        return applySessionHelper(b -> apiService.getGame(b, gameId))
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<GameLevel> getLevel(int levelId) {
        return applySessionHelper(b -> apiService.getLevel(b, levelId))
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<LevelScore> getScore(LevelScoreRequest levelScoreRequest) {
        return applySessionHelper(b -> apiService.getGameScore(b, levelScoreRequest))
                .subscribeOn(SchedulersFacade.io());
    }

    @Override
    public Single<Boolean> uploadScore(List<LevelScoreRequest> levelScoreRequests) {
        return applySessionHelper(b -> apiService.uploadScore(b, levelScoreRequests).toSingleDefault(true))
                .subscribeOn(SchedulersFacade.io());
    }

    private String getBearer() {
        return authInfo.getTokenResponse().getBearer();
    }

    private <R> Single<R> applySessionHelper(Function<String, Single<R>> func) {
        return sessionHelper
                .requireThreshold()
                .andThen(Single.defer(() -> func.apply(getBearer())))
                .doOnError(throwable -> sessionHelper.interceptError(throwable).blockingAwait());
    }

    private Single<TokenResponse> applyAuthSessionHelper(Single<? extends TokenResponse> query) {
        return sessionHelper
                .resetThreshold()
                .andThen(query)
                .onErrorResumeNext(throwable -> sessionHelper.interceptError(throwable)
                        .andThen(Single.error(() -> { //error here
                            setAuthToken(TokenResponse.errorToken());
                            return throwable;
                        })))
                .flatMap(this::setAuthToken);
    }
}
