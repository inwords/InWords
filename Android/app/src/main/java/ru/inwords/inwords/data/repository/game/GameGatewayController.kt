package ru.inwords.inwords.data.repository.game

import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.data.dto.game.Game
import ru.inwords.inwords.data.dto.game.GameInfo
import ru.inwords.inwords.data.dto.game.GameLevel
import ru.inwords.inwords.data.dto.game.LevelScore
import ru.inwords.inwords.domain.model.Resource

interface GameGatewayController {
    fun getGamesInfo(forceUpdate: Boolean = false): Observable<Resource<List<GameInfo>>>
    fun getGame(gameId: Int, forceUpdate: Boolean = false): Observable<Resource<Game>>
    fun getLevel(levelId: Int, forceUpdate: Boolean = false): Observable<Resource<GameLevel>>
    fun getScore(game: Game, levelId: Int, openingQuantity: Int, wordsCount: Int): Single<Resource<LevelScore>>
}