package ru.inwords.inwords.game.data.repository

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.game.data.entity.GameLevelEntity
import ru.inwords.inwords.game.domain.model.*

interface CustomGameGatewayController {
    fun storeGameInfo(gameInfo: GameInfo): Completable
    fun storeGame(game: Game): Completable
    fun getGame(gameId: Int, forceUpdate: Boolean): Observable<Resource<Game>>
    fun storeLevel(gameLevelEntity: GameLevelEntity): Completable
}

interface GetGameGameGatewayController {
    fun getGame(gameId: Int, forceUpdate: Boolean = false): Observable<Resource<Game>>
    fun getGamesInfo(forceUpdate: Boolean = false): Observable<Resource<GamesInfo>>
}

interface GameGatewayController : GetGameGameGatewayController {
    fun getLevel(levelId: Int, forceUpdate: Boolean = false): Observable<Resource<GameLevelEntity>>
    fun getScore(game: Game, levelMetric: LevelMetric): Single<Resource<LevelScore>>
    fun uploadScoresToServer(): Single<List<LevelScore>>
    fun addWordsToUserDictionary(gameId: Int): Completable
    fun clearCache()
}