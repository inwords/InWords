package ru.inwords.inwords.data.repository.game

import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.data.dto.game.*
import ru.inwords.inwords.domain.model.Resource

interface GameGatewayController {
    fun getGamesInfo(forceUpdate: Boolean = false): Observable<Resource<List<GameInfo>>>
    fun getGame(gameId: Int, forceUpdate: Boolean = false): Observable<Resource<Game>>
    fun getLevel(levelId: Int, forceUpdate: Boolean = false): Observable<Resource<GameLevel>>
    fun getScore(game: Game, levelScoreRequest: LevelScoreRequest): Single<Resource<LevelScore>>
    fun uploadScoresToServer(): Single<List<LevelScoreRequest>>
    fun clearCache()
}