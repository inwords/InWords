package ru.inwords.inwords.domain.interactor.game

import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.game.Game
import ru.inwords.inwords.data.dto.game.GameLevel
import ru.inwords.inwords.data.dto.game.LevelScore
import ru.inwords.inwords.data.dto.game.LevelScoreRequest
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
    }

    override fun getGame(gameId: Int, forceUpdate: Boolean): Observable<GameModel> {
        return gameGatewayController.getGame(gameId, forceUpdate)
                .map { GameModel(true, it) }
    }

    override fun getLevel(levelId: Int, forceUpdate: Boolean): Observable<Resource<GameLevel>> {
        return gameGatewayController.getLevel(levelId, forceUpdate)
    }

    override fun getScore(game: Game, levelScoreRequest: LevelScoreRequest): Single<Resource<LevelScore>> {
        return Single.create<Resource<LevelScore>> { emitter -> //so that it cant be disposed on a half-way
            emitter.onSuccess(gameGatewayController.getScore(game, levelScoreRequest).blockingGet())
        }.subscribeOn(SchedulersFacade.io())
    }

    override fun uploadScoresToServer(): Single<List<LevelScoreRequest>> {
        return gameGatewayController.uploadScoresToServer()
    }
}
