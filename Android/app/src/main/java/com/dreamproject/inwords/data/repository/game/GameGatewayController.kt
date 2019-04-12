package com.dreamproject.inwords.data.repository.game

import com.dreamproject.inwords.data.dto.game.Game
import com.dreamproject.inwords.data.dto.game.GameInfo
import com.dreamproject.inwords.data.dto.game.GameLevel
import com.dreamproject.inwords.data.dto.game.LevelScore
import io.reactivex.Observable
import io.reactivex.Single

interface GameGatewayController {
    fun getGamesInfo(): Observable<List<GameInfo>>
    fun getGame(gameId: Int): Observable<Game>
    fun getLevel(levelId: Int): Observable<GameLevel>
    fun getScore(game: Game, levelId: Int, openingQuantity: Int): Single<LevelScore>
}