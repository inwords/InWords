package com.dreamproject.inwords.data.repository.game

import com.dreamproject.inwords.data.dto.game.Game
import com.dreamproject.inwords.data.dto.game.GameInfo
import com.dreamproject.inwords.data.dto.game.GameLevel
import com.dreamproject.inwords.data.dto.game.LevelScore
import com.dreamproject.inwords.domain.model.Resource
import io.reactivex.Observable
import io.reactivex.Single

interface GameGatewayController {
    fun getGamesInfo(): Observable<Resource<List<GameInfo>>>
    fun getGame(gameId: Int): Observable<Resource<Game>>
    fun getLevel(levelId: Int): Observable<Resource<GameLevel>>
    fun getScore(game: Game, levelId: Int, openingQuantity: Int): Single<LevelScore>
}