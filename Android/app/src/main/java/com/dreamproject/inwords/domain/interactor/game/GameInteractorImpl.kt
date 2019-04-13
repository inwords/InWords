package com.dreamproject.inwords.domain.interactor.game

import com.dreamproject.inwords.data.dto.game.Game
import com.dreamproject.inwords.data.dto.game.GameLevel
import com.dreamproject.inwords.data.dto.game.LevelScore
import com.dreamproject.inwords.data.repository.game.GameGatewayController
import com.dreamproject.inwords.domain.model.GameModel
import com.dreamproject.inwords.domain.model.GamesInfoModel
import com.dreamproject.inwords.domain.model.Resource
import io.reactivex.Observable
import io.reactivex.Single
import javax.inject.Inject

class GameInteractorImpl @Inject constructor(
        private val gameGatewayController: GameGatewayController) : GameInteractor {

    override fun getGamesInfo(forceUpdate: Boolean): Observable<GamesInfoModel> {
        return gameGatewayController.getGamesInfo(forceUpdate)
                .map { GamesInfoModel(true, it) }
                .cache()
    }

    override fun getGame(gameId: Int, forceUpdate: Boolean): Observable<GameModel> {
        return gameGatewayController.getGame(gameId, forceUpdate)
                .map { GameModel(true, it) }
                .cache()
    }

    override fun getLevel(levelId: Int, forceUpdate: Boolean): Observable<Resource<GameLevel>> {
        return gameGatewayController.getLevel(levelId, forceUpdate)
                .cache()
    }

    override fun getScore(game: Game, levelId: Int, openingQuantity: Int): Single<Resource<LevelScore>> {
        return gameGatewayController.getScore(game, levelId, openingQuantity)
                .cache()
    }
}
