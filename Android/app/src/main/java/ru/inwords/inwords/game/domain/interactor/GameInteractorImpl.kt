package ru.inwords.inwords.game.domain.interactor

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.game.data.entity.GameLevelEntity
import ru.inwords.inwords.game.data.repository.GameGatewayController
import ru.inwords.inwords.game.domain.model.Game
import ru.inwords.inwords.game.domain.model.GamesInfo
import ru.inwords.inwords.game.domain.model.TrainingMetric
import ru.inwords.inwords.game.domain.model.TrainingScore
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor

class GameInteractorImpl(
    private val gameGatewayController: GameGatewayController,
    private val translationWordsInteractor: TranslationWordsInteractor
) : GameInteractor {

    override fun getGamesInfo(forceUpdate: Boolean): Observable<Resource<GamesInfo>> {
        return gameGatewayController.getGamesInfo(forceUpdate)
    }

    override fun getGame(gameId: Int, forceUpdate: Boolean): Observable<Resource<Game>> {
        return gameGatewayController.getGame(gameId, forceUpdate)
    }

    override fun getLevel(levelId: Int, forceUpdate: Boolean): Observable<Resource<GameLevelEntity>> {
        return gameGatewayController.getLevel(levelId, forceUpdate)
    }

    override fun getScore(game: Game, trainingMetric: TrainingMetric): Single<Resource<TrainingScore>> {
        return gameGatewayController.getScore(game, trainingMetric)
    }

    override fun uploadScoresToServer(): Single<List<TrainingScore>> {
        return gameGatewayController.uploadScoresToServer()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun addWordsToUserDictionary(gameId: Int): Completable = gameGatewayController.addWordsToUserDictionary(gameId)
        .doOnComplete {
            translationWordsInteractor.clearCache()
        }

    override fun clearCache() {
        gameGatewayController.clearCache()
    }
}
