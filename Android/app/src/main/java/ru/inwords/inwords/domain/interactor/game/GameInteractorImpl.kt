package ru.inwords.inwords.domain.interactor.game

import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.Resource
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.data.dto.game.*
import ru.inwords.inwords.data.repository.game.GameGatewayController
import ru.inwords.inwords.data.repository.game.custom_game.GameCreator
import ru.inwords.inwords.domain.model.GameModel
import ru.inwords.inwords.domain.model.GamesInfoModel
import ru.inwords.inwords.domain.model.LevelResultModel
import javax.inject.Inject

class GameInteractorImpl @Inject constructor(
        private val gameGatewayController: GameGatewayController,
        private val gameCreator: GameCreator) : GameInteractor {

    override fun getGamesInfo(forceUpdate: Boolean): Observable<Resource<GamesInfoModel>> {
        return gameGatewayController.getGamesInfo(forceUpdate)
    }

    override fun getGame(gameId: Int, forceUpdate: Boolean): Observable<Resource<GameModel>> {
        return gameGatewayController.getGame(gameId, forceUpdate)
    }

    override fun createCustomLevel(wordTranslations: List<WordTranslation>): Single<GameLevelInfo> {
        return Single.fromCallable { gameCreator.createLevel(wordTranslations) }
    }

    override fun getLevel(levelId: Int, forceUpdate: Boolean): Observable<Resource<GameLevel>> {
        return gameGatewayController.getLevel(levelId, forceUpdate)
    }

    override fun getScore(game: Game, levelResultModel: LevelResultModel): Single<Resource<LevelScore>> {
        return Single.create<Resource<LevelScore>> { emitter ->
            //so that it cant be disposed on a half-way
            emitter.onSuccess(gameGatewayController.getScore(game, levelResultModel).blockingGet())
        }.subscribeOn(SchedulersFacade.io())
    }

    override fun uploadScoresToServer(): Single<List<LevelScoreRequest>> {
        return gameGatewayController.uploadScoresToServer()
    }

    override fun clearCache() {
        gameGatewayController.clearCache()
    }
}
