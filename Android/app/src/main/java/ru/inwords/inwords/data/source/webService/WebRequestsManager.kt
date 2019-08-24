package ru.inwords.inwords.data.source.webService

import io.reactivex.Single
import ru.inwords.inwords.data.dto.EntityIdentificator
import ru.inwords.inwords.data.dto.User
import ru.inwords.inwords.data.dto.UserCredentials
import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.data.dto.game.*
import ru.inwords.inwords.data.dto.google.TtsSynthesizeRequest
import ru.inwords.inwords.data.source.webService.session.TokenResponse
import ru.inwords.inwords.data.sync.PullWordsAnswer

interface WebRequestsManager {
    fun getLogin(): Single<String>

    fun getAuthorisedUser(): Single<User>

    fun getGameInfos(): Single<List<GameInfo>>

    fun getUserEmail(): Single<String>

    fun getToken(): Single<TokenResponse>

    fun getToken(userCredentials: UserCredentials): Single<TokenResponse>

    fun registerUser(userCredentials: UserCredentials): Single<TokenResponse>

    fun getUserById(id: Int): Single<User>

    fun insertAllWords(wordTranslations: List<WordTranslation>): Single<List<EntityIdentificator>>

    fun removeAllServerIds(serverIds: List<Int>): Single<Int>

    fun pullWords(serverIds: List<Int>): Single<PullWordsAnswer>

    fun getGame(gameId: Int): Single<Game>

    fun getLevel(levelId: Int): Single<GameLevel>

    fun getScore(levelScoreRequest: LevelScoreRequest): Single<LevelScore>

    fun uploadScore(levelScoreRequests: List<LevelScoreRequest>): Single<Boolean>

    fun ttsSynthesize(request: TtsSynthesizeRequest, googleServicesApiKey: String): Single<String>
}
