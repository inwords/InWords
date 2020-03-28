package ru.inwords.inwords.game.data.repository

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.data.source.remote.WebRequestsManagerAuthorised
import ru.inwords.inwords.game.data.bean.*
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class GameRemoteRepository @Inject constructor(private val webRequestsManagerAuthorised: WebRequestsManagerAuthorised) {
    fun getGameInfos(): Single<List<GameInfoEntity>> {
        return webRequestsManagerAuthorised.getGameInfos()
            .map { wordSetReply -> wordSetReply.wordSetsList.map { GameInfoEntity(it.id, -1, it.description, it.title, true) } }
    }

    fun getGame(gameId: Int): Single<GameResponse> {
        return webRequestsManagerAuthorised.getGame(gameId)
    }

    fun getLevel(levelId: Int): Single<GameLevel> {
        return webRequestsManagerAuthorised.getLevel(levelId)
    }

    fun getScore(levelScoreRequest: LevelScoreRequest): Single<LevelScore> {
        return webRequestsManagerAuthorised.getScore(TrainingEstimateRequest(listOf(levelScoreRequest)))
            .map { it.first() }
    }

    fun uploadScore(levelScoreRequests: List<LevelScoreRequest>): Single<Boolean> {
        return webRequestsManagerAuthorised.getScore(TrainingEstimateRequest(levelScoreRequests))
            .map { true }
    }

    fun addWordsToUserDictionary(gameId: Int): Completable {
        return webRequestsManagerAuthorised.addWordSetToDictionary(gameId)
    }
}
