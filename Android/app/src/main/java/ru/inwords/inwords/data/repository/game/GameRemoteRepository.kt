package ru.inwords.inwords.data.repository.game

import io.reactivex.Single
import ru.inwords.inwords.data.dto.game.*
import ru.inwords.inwords.data.source.remote.WebRequestsManagerAuthorised
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class GameRemoteRepository @Inject constructor(private val webRequestsManagerAuthorised: WebRequestsManagerAuthorised) {
    fun getGameInfos(): Single<List<GameInfo>> {
        return webRequestsManagerAuthorised.getGameInfos()
    }

    fun getGame(gameId: Int): Single<Game> {
        return webRequestsManagerAuthorised.getGame(gameId)
    }

    fun getLevel(levelId: Int): Single<GameLevel> {
        return webRequestsManagerAuthorised.getLevel(levelId)
    }

    fun getScore(levelScoreRequest: LevelScoreRequest): Single<LevelScore> {
        return webRequestsManagerAuthorised.getScore(levelScoreRequest)
    }

    fun uploadScore(levelScoreRequests: List<LevelScoreRequest>): Single<Boolean> {
        return webRequestsManagerAuthorised.uploadScore(levelScoreRequests)
    }
}
