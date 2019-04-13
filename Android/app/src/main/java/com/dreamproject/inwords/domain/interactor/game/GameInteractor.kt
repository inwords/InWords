package com.dreamproject.inwords.domain.interactor.game

import com.dreamproject.inwords.data.dto.game.Game
import com.dreamproject.inwords.data.dto.game.GameLevel
import com.dreamproject.inwords.data.dto.game.LevelScore
import com.dreamproject.inwords.domain.model.GameModel
import com.dreamproject.inwords.domain.model.GamesInfoModel
import com.dreamproject.inwords.domain.model.Resource
import io.reactivex.Observable
import io.reactivex.Single

interface GameInteractor {
    fun getGamesInfo(forceUpdate: Boolean = false): Observable<GamesInfoModel>
    fun getGame(gameId: Int, forceUpdate: Boolean = false): Observable<GameModel>
    fun getLevel(levelId: Int, forceUpdate: Boolean = false): Observable<Resource<GameLevel>>
    fun getScore(game: Game, levelId: Int, openingQuantity: Int): Single<Resource<LevelScore>>
}