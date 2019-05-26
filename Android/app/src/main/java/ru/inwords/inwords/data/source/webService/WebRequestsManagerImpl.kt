package ru.inwords.inwords.data.source.webService

import io.reactivex.Single
import io.reactivex.functions.BiFunction
import io.reactivex.schedulers.Schedulers
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.EntityIdentificator
import ru.inwords.inwords.data.dto.User
import ru.inwords.inwords.data.dto.UserCredentials
import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.data.dto.game.*
import ru.inwords.inwords.data.dto.google.AudioConfig
import ru.inwords.inwords.data.dto.google.Input
import ru.inwords.inwords.data.dto.google.TtsSynthesizeRequest
import ru.inwords.inwords.data.dto.google.Voice
import ru.inwords.inwords.data.source.webService.session.AuthInfo
import ru.inwords.inwords.data.source.webService.session.SessionHelper
import ru.inwords.inwords.data.source.webService.session.TokenResponse
import ru.inwords.inwords.data.source.webService.session.validCredentials
import ru.inwords.inwords.data.sync.PullWordsAnswer
import javax.inject.Inject

class WebRequestsManagerImpl @Inject
internal constructor(private val apiService: WebApiService,
                     authenticator: BasicAuthenticator,
                     private val sessionHelper: SessionHelper,
                     private val authInfo: AuthInfo) : WebRequestsManager {

    init {
        authenticator.setOnUnauthorisedCallback(object : BasicAuthenticator.OnUnauthorisedCallback {
            override fun perform(): TokenResponse {
                return getToken().blockingGet()
            }
        }) //TODO COSTIL
    }

    private fun setAuthToken(tokenResponse: TokenResponse): Single<TokenResponse> {
        return Single.fromCallable {
            this.authInfo.tokenResponse = tokenResponse
            tokenResponse
        }
    }

    private fun Single<UserCredentials>.updateToken(): Single<TokenResponse> {
        return filter { validCredentials(it) }
                .toSingle()
                .flatMap { apiService.getToken(it) }
                .applyAuthSessionHelper()
                .subscribeOn(SchedulersFacade.io())
    }

    private fun getToken(): Single<TokenResponse> {
        return authInfo.getCredentials().updateToken()
    }

    override fun getUserEmail(): Single<String> {
        return authInfo.getCredentials().map { it.email }
    }

    override fun getToken(userCredentials: UserCredentials): Single<TokenResponse> {
        return authInfo.setCredentials(userCredentials).updateToken()
    }

    override fun registerUser(userCredentials: UserCredentials): Single<TokenResponse> {
        return apiService.registerUser(userCredentials)
                .applyAuthSessionHelper()
                .zipWith(authInfo.setCredentials(userCredentials),
                        BiFunction<TokenResponse, UserCredentials, TokenResponse> { tokenResponse, u -> tokenResponse })
                .subscribeOn(Schedulers.io())
    }

    override fun getLogin(): Single<String> {
        return applySessionHelper { apiService.getLogin(it) }
                .subscribeOn(SchedulersFacade.io())
    }

    override fun getAuthorisedUser(): Single<User> {
        return applySessionHelper { apiService.getAuthorisedUser(it) }
                //.flatMap(Observable::fromIterable)
                .subscribeOn(SchedulersFacade.io())
    }

    override fun getUserById(id: Int): Single<User> {
        return applySessionHelper<User> { apiService.getUserById(it, id) }
                //.flatMap(Observable::fromIterable)
                .subscribeOn(SchedulersFacade.io())
    }

    override fun insertAllWords(wordTranslations: List<WordTranslation>): Single<List<EntityIdentificator>> {
        return applySessionHelper<List<EntityIdentificator>> { apiService.addPairs(it, wordTranslations) }
                .subscribeOn(SchedulersFacade.io())
    }

    override fun removeAllServerIds(serverIds: List<Int>): Single<Int> {
        return applySessionHelper<Int> { apiService.deletePairs(it, serverIds) }
                .subscribeOn(SchedulersFacade.io())
    }

    override fun pullWords(serverIds: List<Int>): Single<PullWordsAnswer> {
        return applySessionHelper<PullWordsAnswer> { apiService.pullWordsPairs(it, serverIds) }
                .subscribeOn(SchedulersFacade.io())
    }

    override fun getGameInfos(): Single<List<GameInfo>> {
        return applySessionHelper { apiService.getGameInfos(it) }
                .subscribeOn(SchedulersFacade.io())
    }

    override fun getGame(gameId: Int): Single<Game> {
        return applySessionHelper<Game> { apiService.getGame(it, gameId) }
                .subscribeOn(SchedulersFacade.io())
    }

    override fun getLevel(levelId: Int): Single<GameLevel> {
        return applySessionHelper<GameLevel> { apiService.getLevel(it, levelId) }
                .subscribeOn(SchedulersFacade.io())
    }

    override fun getScore(levelScoreRequest: LevelScoreRequest): Single<LevelScore> {
        return applySessionHelper<LevelScore> { apiService.getGameScore(it, levelScoreRequest) }
                .subscribeOn(SchedulersFacade.io())
    }

    override fun uploadScore(levelScoreRequests: List<LevelScoreRequest>): Single<Boolean> {
        return applySessionHelper<Boolean> { apiService.uploadScore(it, levelScoreRequests).toSingleDefault(true) }
                .subscribeOn(SchedulersFacade.io())
    }

    override fun ttsSynthesize(textToSpeak: String, googleServicesApiKey: String): Single<String> { //TODO
        val request = TtsSynthesizeRequest(
                Input(textToSpeak),
                Voice("en-US", "en-US-Wavenet-D"),
                AudioConfig("OGG_OPUS"))

        return apiService.ttsSynthesize(googleServicesApiKey, request).map { it.audioContent }
    }

    private fun <R> applySessionHelper(func: (String) -> Single<R>): Single<R> {
        return sessionHelper
                .requireThreshold()
                .andThen(Single.defer { func(authInfo.bearer) })
                .doOnError { throwable -> sessionHelper.interceptError(throwable).blockingAwait() }
    }

    private fun Single<TokenResponse>.applyAuthSessionHelper(): Single<TokenResponse> {
        return sessionHelper
                .resetThreshold()
                .andThen(this)
                .onErrorResumeNext { throwable ->
                    sessionHelper.interceptError(throwable)
                            .andThen(Single.error {
                                //error here
                                setAuthToken(TokenResponse.errorToken())
                                throwable
                            })
                }
                .flatMap { setAuthToken(it) }
    }
}
