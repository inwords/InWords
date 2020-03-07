package ru.inwords.inwords.game.domain.interactor

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.game.data.bean.GameLevel
import ru.inwords.inwords.game.data.bean.GameLevelInfo
import ru.inwords.inwords.game.data.bean.LevelScore
import ru.inwords.inwords.game.data.bean.LevelScoreRequest
import ru.inwords.inwords.game.data.repository.GameGatewayController
import ru.inwords.inwords.game.data.repository.custom_game.GameCreator
import ru.inwords.inwords.game.domain.model.Game
import ru.inwords.inwords.game.domain.model.GamesInfo
import ru.inwords.inwords.game.domain.model.LevelResultModel
import ru.inwords.inwords.translation.data.bean.WordTranslation
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor
import javax.inject.Inject

class GameInteractorImpl @Inject constructor(
    private val gameGatewayController: GameGatewayController,
    private val translationWordsInteractor: TranslationWordsInteractor,
    private val gameCreator: GameCreator
) : GameInteractor {

    override fun getGamesInfo(forceUpdate: Boolean): Observable<Resource<GamesInfo>> {
        return gameGatewayController.getGamesInfo(forceUpdate)
    }

    override fun getGame(gameId: Int, forceUpdate: Boolean): Observable<Resource<Game>> {
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

    override fun addWordsToUserDictionary(gameId: Int): Completable = gameGatewayController.addWordsToUserDictionary(gameId)
        .doOnComplete {
            translationWordsInteractor.clearCache()
        }

    override fun clearCache() {
        gameGatewayController.clearCache()
    }
}
