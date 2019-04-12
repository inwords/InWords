package com.dreamproject.inwords.data.repository.game

import com.dreamproject.inwords.data.dto.game.*
import com.dreamproject.inwords.data.source.webService.WebRequestsManager
import io.reactivex.Single
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class GameRemoteRepository @Inject constructor(private val webRequestsManager: WebRequestsManager) {
    fun getGameInfos(): Single<List<GameInfo>> {
        return webRequestsManager.gameInfos
    }

    fun getGame(gameId: Int): Single<Game> {
        return webRequestsManager.getGame(gameId)
    }

    fun getLevel(levelId: Int): Single<GameLevel> {
        return webRequestsManager.getLevel(levelId)
    }

    fun getScore(levelScoreRequest: LevelScoreRequest): Single<LevelScore> {
        return webRequestsManager.getScore(levelScoreRequest)
    }
}
