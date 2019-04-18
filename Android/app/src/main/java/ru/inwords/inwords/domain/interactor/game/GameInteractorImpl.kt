package ru.inwords.inwords.domain.interactor.game

import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.data.dto.game.Game
import ru.inwords.inwords.data.dto.game.GameLevel
import ru.inwords.inwords.data.dto.game.LevelScore
import ru.inwords.inwords.data.repository.game.GameGatewayController
import ru.inwords.inwords.domain.model.GameModel
import ru.inwords.inwords.domain.model.GamesInfoModel
import ru.inwords.inwords.domain.model.Resource
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

    override fun getScore(game: Game, levelId: Int, openingQuantity: Int, wordsCount: Int): Single<Resource<LevelScore>> {
        return gameGatewayController.getScore(game, levelId, openingQuantity, wordsCount)
                .cache()
    }
}
