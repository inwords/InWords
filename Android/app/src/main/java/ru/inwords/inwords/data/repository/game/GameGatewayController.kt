package ru.inwords.inwords.data.repository.game

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.Resource
import ru.inwords.inwords.data.dto.game.*
import ru.inwords.inwords.domain.model.GameModel
import ru.inwords.inwords.domain.model.GamesInfoModel
import ru.inwords.inwords.domain.model.LevelResultModel

interface CustomGameGatewayController{
    fun storeGameInfo(gameInfo: GameInfo): Completable
    fun storeGame(game: Game): Completable
    fun getGame(gameId: Int, forceUpdate: Boolean): Observable<Resource<GameModel>>
    fun storeLevel(gameLevel: GameLevel): Completable
}

interface GameGatewayController {
    fun getGamesInfo(forceUpdate: Boolean = false): Observable<Resource<GamesInfoModel>>
    fun getGame(gameId: Int, forceUpdate: Boolean = false): Observable<Resource<GameModel>>
    fun getLevel(levelId: Int, forceUpdate: Boolean = false): Observable<Resource<GameLevel>>
    fun getScore(game: Game, levelResultModel: LevelResultModel): Single<Resource<LevelScore>>
    fun uploadScoresToServer(): Single<List<LevelScoreRequest>>
    fun clearCache()
}