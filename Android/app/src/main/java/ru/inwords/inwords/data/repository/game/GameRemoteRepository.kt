package ru.inwords.inwords.data.repository.game

import android.util.Log
import io.reactivex.Single
import ru.inwords.inwords.data.dto.game.*
import ru.inwords.inwords.data.source.webService.WebRequestsManager
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

    fun uploadScores(list: List<LevelScoreRequest>): Single<List<LevelScore>> {
        return Single.fromCallable {
            Log.d("GameRemoteRepository", "upload scores try")
            emptyList<LevelScore>()
        } //TODO
    }
}
