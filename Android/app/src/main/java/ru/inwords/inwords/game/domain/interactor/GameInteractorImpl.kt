package ru.inwords.inwords.game.domain.interactor

import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.game.data.bean.*
import ru.inwords.inwords.game.data.repository.GameGatewayController
import ru.inwords.inwords.game.data.repository.custom_game.GameCreator
import ru.inwords.inwords.game.domain.model.GameModel
import ru.inwords.inwords.game.domain.model.GamesInfoModel
import ru.inwords.inwords.game.domain.model.LevelResultModel
import ru.inwords.inwords.translation.data.bean.WordTranslation
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
        return gameGatewayController.getScore(game, levelResultModel)
    }

    override fun uploadScoresToServer(): Single<List<LevelScoreRequest>> {
        return gameGatewayController.uploadScoresToServer()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun clearCache() {
        gameGatewayController.clearCache()
    }
}
