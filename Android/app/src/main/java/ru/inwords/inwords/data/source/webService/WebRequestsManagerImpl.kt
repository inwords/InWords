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

    private val credentials: Single<UserCredentials>
        get() = Single.fromCallable { authInfo.credentials }

    private val token: Single<TokenResponse>
        get() = credentials
                .filter { validCredentials(it) }
                .toSingle()
                .flatMap { s -> applyAuthSessionHelper(apiService.getToken(s)) }
                .subscribeOn(SchedulersFacade.io())

    private val bearer: String
        get() = authInfo.tokenResponse.bearer

    init {
        authenticator.setOnUnauthorisedCallback(object : BasicAuthenticator.OnUnauthorisedCallback {
            override fun perform(): TokenResponse {
                return token.blockingGet()
            }
        }) //TODO COSTIL
    }

    private fun setAuthToken(tokenResponse: TokenResponse): Single<TokenResponse> {
        return Single.fromCallable {
            this.authInfo.tokenResponse = tokenResponse
            tokenResponse
        }
    }

    private fun setCredentials(userCredentials: UserCredentials): Single<UserCredentials> {
        return Single.fromCallable {
            authInfo.credentials = userCredentials
            authInfo.credentials
        }
    }

    override fun getToken(userCredentials: UserCredentials): Single<TokenResponse> {
        return setCredentials(userCredentials)
                .filter { validCredentials(it) }
                .toSingle()
                .flatMap { s -> applyAuthSessionHelper(apiService.getToken(s)) }
                .subscribeOn(SchedulersFacade.io())
    }

    override fun registerUser(userCredentials: UserCredentials): Single<TokenResponse> {
        return applyAuthSessionHelper(apiService.registerUser(userCredentials))
                .zipWith(setCredentials(userCredentials), BiFunction<TokenResponse, UserCredentials, TokenResponse> { tokenResponse, u -> tokenResponse })
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
        return applySessionHelper<User> { b -> apiService.getUserById(b, id) }
                //.flatMap(Observable::fromIterable)
                .subscribeOn(SchedulersFacade.io())
    }

    override fun insertAllWords(wordTranslations: List<WordTranslation>): Single<List<EntityIdentificator>> {
        return applySessionHelper<List<EntityIdentificator>> { b -> apiService.addPairs(b, wordTranslations) }
                .subscribeOn(SchedulersFacade.io())
    }

    override fun removeAllServerIds(serverIds: List<Int>): Single<Int> {
        return applySessionHelper<Int> { b -> apiService.deletePairs(b, serverIds) }
                .subscribeOn(SchedulersFacade.io())
    }

    override fun pullWords(serverIds: List<Int>): Single<PullWordsAnswer> {
        return applySessionHelper<PullWordsAnswer> { b -> apiService.pullWordsPairs(b, serverIds) }
                .subscribeOn(SchedulersFacade.io())
    }

    override fun getGameInfos(): Single<List<GameInfo>> {
        return applySessionHelper { apiService.getGameInfos(it) }
                .subscribeOn(SchedulersFacade.io())
    }

    override fun getGame(gameId: Int): Single<Game> {
        return applySessionHelper<Game> { b -> apiService.getGame(b, gameId) }
                .subscribeOn(SchedulersFacade.io())
    }

    override fun getLevel(levelId: Int): Single<GameLevel> {
        return applySessionHelper<GameLevel> { b -> apiService.getLevel(b, levelId) }
                .subscribeOn(SchedulersFacade.io())
    }

    override fun getScore(levelScoreRequest: LevelScoreRequest): Single<LevelScore> {
        return applySessionHelper<LevelScore> { b -> apiService.getGameScore(b, levelScoreRequest) }
                .subscribeOn(SchedulersFacade.io())
    }

    override fun uploadScore(levelScoreRequests: List<LevelScoreRequest>): Single<Boolean> {
        return applySessionHelper<Boolean> { b -> apiService.uploadScore(b, levelScoreRequests).toSingleDefault(true) }
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
                .andThen(Single.defer { func(bearer) })
                .doOnError { throwable -> sessionHelper.interceptError(throwable).blockingAwait() }
    }

    private fun applyAuthSessionHelper(query: Single<TokenResponse>): Single<TokenResponse> {
        return sessionHelper
                .resetThreshold()
                .andThen(query)
                .onErrorResumeNext { throwable ->
                    sessionHelper.interceptError(throwable)
                            .andThen(Single.error {
                                //error here
                                setAuthToken(TokenResponse.errorToken())
                                throwable
                            })
                }
                .flatMap { this.setAuthToken(it) }
    }
}
