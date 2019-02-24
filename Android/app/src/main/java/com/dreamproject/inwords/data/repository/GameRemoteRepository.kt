package com.dreamproject.inwords.data.repository

import com.dreamproject.inwords.data.dto.game.Game
import com.dreamproject.inwords.data.dto.game.GameInfo
import com.dreamproject.inwords.data.dto.game.GameLevel
import com.dreamproject.inwords.data.source.webService.WebRequestsManager
import io.reactivex.Single
import javax.inject.Inject


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
}
