package ru.inwords.inwords.data.source.webService

import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.functions.BiFunction
import io.reactivex.schedulers.Schedulers
import io.reactivex.subjects.BehaviorSubject
import ru.inwords.inwords.core.ObservableTransformers
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

    private val authenticatedNotifierSubject = BehaviorSubject.create<Boolean>()

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

            authenticatedNotifierSubject.onNext(!authInfo.isNoToken)

            tokenResponse
        }
    }

    private fun Single<UserCredentials>.updateToken(): Single<TokenResponse> {
        return flatMap {
            if (validCredentials(it)) {
                apiService.getToken(it)
            } else {
                setAuthToken(AuthInfo.unauthorisedToken)
            }
        }
                .applyAuthSessionHelper()
                .subscribeOn(SchedulersFacade.io())
    }

    override fun getToken(): Single<TokenResponse> {
        return authInfo.getCredentials().updateToken()
    }

    override fun getToken(userCredentials: UserCredentials): Single<TokenResponse> {
        return authInfo.setCredentials(userCredentials).updateToken()
    }

    override fun getUserEmail(): Single<String> {
        return authInfo.getCredentials().map { it.email }
    }

    override fun registerUser(userCredentials: UserCredentials): Single<TokenResponse> {
        return apiService.registerUser(userCredentials)
                .applyAuthSessionHelper()
                .zipWith(authInfo.setCredentials(userCredentials),
                        BiFunction<TokenResponse, UserCredentials, TokenResponse> { tokenResponse, u -> tokenResponse })
                .subscribeOn(Schedulers.io())
    }

    override fun getLogin(): Single<String> {
        return valve()
                .flatMap { getAuthToken() }
                .flatMap { apiService.getLogin(it) }
                .interceptError()
                .subscribeOn(SchedulersFacade.io())
    }

    override fun getAuthorisedUser(): Single<User> {
        return valve()
                .flatMap { getAuthToken() }
                .flatMap { apiService.getAuthorisedUser(it) }
                .interceptError()
                //.flatMap(Observable::fromIterable)
                .subscribeOn(SchedulersFacade.io())
    }

    override fun getUserById(id: Int): Single<User> {
        return valve()
                .flatMap { getAuthToken() }
                .flatMap { apiService.getUserById(it, id) }
                .interceptError()
                //.flatMap(Observable::fromIterable)
                .subscribeOn(SchedulersFacade.io())
    }

    override fun insertAllWords(wordTranslations: List<WordTranslation>): Single<List<EntityIdentificator>> {
        return valve()
                .flatMap { getAuthToken() }
                .flatMap { apiService.addPairs(it, wordTranslations) }
                .interceptError()
                .subscribeOn(SchedulersFacade.io())
    }

    override fun removeAllServerIds(serverIds: List<Int>): Single<Int> {
        return valve()
                .flatMap { getAuthToken() }
                .flatMap { apiService.deletePairs(it, serverIds) }
                .interceptError()
                .subscribeOn(SchedulersFacade.io())
    }

    override fun pullWords(serverIds: List<Int>): Single<PullWordsAnswer> {
        return valve()
                .flatMap { getAuthToken() }
                .flatMap { apiService.pullWordsPairs(it, serverIds) }
                .interceptError()
                .subscribeOn(SchedulersFacade.io())
    }

    override fun getGameInfos(): Single<List<GameInfo>> {
        return valve()
                .flatMap { getAuthToken() }
                .flatMap { apiService.getGameInfos(it) }
                .interceptError()
                .subscribeOn(SchedulersFacade.io())
    }

    override fun getGame(gameId: Int): Single<Game> {
        return valve()
                .flatMap { getAuthToken() }
                .flatMap { apiService.getGame(it, gameId) }
                .interceptError()
                .subscribeOn(SchedulersFacade.io())
    }

    override fun getLevel(levelId: Int): Single<GameLevel> {
        return valve()
                .flatMap { getAuthToken() }
                .flatMap { apiService.getLevel(it, levelId) }
                .interceptError()
                .subscribeOn(SchedulersFacade.io())
    }

    override fun getScore(levelScoreRequest: LevelScoreRequest): Single<LevelScore> {
        return valve()
                .flatMap { getAuthToken() }
                .flatMap { apiService.getGameScore(it, levelScoreRequest) }
                .interceptError()
                .subscribeOn(SchedulersFacade.io())
    }

    override fun uploadScore(levelScoreRequests: List<LevelScoreRequest>): Single<Boolean> {
        return valve()
                .flatMap { getAuthToken() }
                .flatMap { apiService.uploadScore(it, levelScoreRequests).toSingleDefault(true) }
                .interceptError()
                .subscribeOn(SchedulersFacade.io())
    }

    override fun ttsSynthesize(textToSpeak: String, googleServicesApiKey: String): Single<String> { //TODO
        val request = TtsSynthesizeRequest(
                Input(textToSpeak),
                Voice("en-US", "en-US-Wavenet-D"),
                AudioConfig("OGG_OPUS"))

        return apiService.ttsSynthesize(googleServicesApiKey, request).map { it.audioContent }
    }

    private fun getAuthToken(): Single<String> {
        return authInfo.getCredentials()
                .doOnSuccess {
                    if (!validCredentials(it)) {
                        throw RuntimeException("invalid credentials (no credentials)") //TODO nice exception
                    }
                }
                .map { authInfo.bearer }
    }

    private fun valve(): Single<Unit> {
        return Observable.just(Unit)
                .doOnNext { sessionHelper.requireThreshold() }
                .compose(ObservableTransformers.valve(authenticatedNotifierSubject, false))
                .firstOrError()
    }

    private fun Single<TokenResponse>.applyAuthSessionHelper(): Single<TokenResponse> {
        return doOnSuccess { sessionHelper.resetThreshold() }
                .onErrorResumeNext {
                    if (sessionHelper.interceptAuthError(it)) {
                        setAuthToken(AuthInfo.unauthorisedToken)
                    } else {
                        setAuthToken(AuthInfo.errorToken)
                    }
                }
                .flatMap { setAuthToken(it) }
    }

    private fun <T> Single<T>.interceptError(): Single<T> {
        return doOnError { throwable -> sessionHelper.interceptAuthError(throwable) }
    }
}
