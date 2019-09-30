package ru.inwords.inwords.data.repository.game

import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.Resource
import ru.inwords.inwords.data.dto.game.Game
import ru.inwords.inwords.data.dto.game.GameLevel
import ru.inwords.inwords.data.dto.game.LevelScore
import ru.inwords.inwords.data.dto.game.LevelScoreRequest
import ru.inwords.inwords.domain.model.GameModel
import ru.inwords.inwords.domain.model.GamesInfoModel

interface GameGatewayController {
    fun getGamesInfo(forceUpdate: Boolean = false): Observable<Resource<GamesInfoModel>>
    fun getGame(gameId: Int, forceUpdate: Boolean = false): Observable<Resource<GameModel>>
    fun getLevel(levelId: Int, forceUpdate: Boolean = false): Observable<Resource<GameLevel>>
    fun getScore(game: Game, levelScoreRequest: LevelScoreRequest): Single<Resource<LevelScore>>
    fun uploadScoresToServer(): Single<List<LevelScoreRequest>>
    fun clearCache()
}