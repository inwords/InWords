package ru.inwords.inwords.domain.interactor.game

import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.data.dto.game.Game
import ru.inwords.inwords.data.dto.game.GameLevel
import ru.inwords.inwords.data.dto.game.LevelScore
import ru.inwords.inwords.domain.model.GameModel
import ru.inwords.inwords.domain.model.GamesInfoModel
import ru.inwords.inwords.domain.model.Resource

interface GameInteractor {
    fun getGamesInfo(forceUpdate: Boolean = false): Observable<GamesInfoModel>
    fun getGame(gameId: Int, forceUpdate: Boolean = false): Observable<GameModel>
    fun getLevel(levelId: Int, forceUpdate: Boolean = false): Observable<Resource<GameLevel>>
    fun getScore(game: Game, levelId: Int, openingQuantity: Int): Single<Resource<LevelScore>>
}