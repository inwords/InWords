package com.dreamproject.inwords.data.repository.game

import com.dreamproject.inwords.core.util.SchedulersFacade
import com.dreamproject.inwords.dagger.annotations.QGame
import com.dreamproject.inwords.dagger.annotations.QGameInfo
import com.dreamproject.inwords.dagger.annotations.QGameLevel
import com.dreamproject.inwords.data.dto.game.*
import io.reactivex.Observable
import io.reactivex.Single
import javax.inject.Inject

class GameGatewayControllerImpl @Inject constructor(
        private val gameRemoteRepository: GameRemoteRepository,
        @QGameInfo private val gameInfoRepository: GameListProvider<GameInfo>,
        @QGame private val gameRepository: GameEntityProvider<Game>,
        @QGameLevel private val gameLevelRepository: GameEntityProvider<GameLevel>) : GameGatewayController {

    override fun getGamesInfo(): Observable<List<GameInfo>> {
        return gameInfoRepository.getAll().subscribeOn(SchedulersFacade.io())
    }

    override fun getGame(gameId: Int): Observable<Game> {
        return gameRepository.getById(gameId).subscribeOn(SchedulersFacade.io())
    }

    override fun getLevel(levelId: Int): Observable<GameLevel> {
        return gameLevelRepository.getById(levelId).subscribeOn(SchedulersFacade.io())
    }

    override fun getScore(game: Game, levelId: Int, openingQuantity: Int): Single<LevelScore> {
        return gameRemoteRepository.getScore(LevelScoreRequest(levelId, openingQuantity))
                .doOnSuccess { updateLocalScore(game, levelId) }
                .doOnError {
                    //TODO store local
                }
                .subscribeOn(SchedulersFacade.io())
    }

    private fun updateLocalScore(game: Game, levelId: Int) {
        val list = game.gameLevelInfos.map {
            if (it.levelId == levelId) {
                it.copy(playerStars = 3)
            }
            it
        }
        gameRepository.enqueueStoreLocal(game.copy(gameLevelInfos = list))
    }
}

