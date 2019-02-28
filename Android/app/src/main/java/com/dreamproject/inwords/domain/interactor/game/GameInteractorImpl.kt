package com.dreamproject.inwords.domain.interactor.game

import com.dreamproject.inwords.dagger.annotations.QGame
import com.dreamproject.inwords.dagger.annotations.QGameInfo
import com.dreamproject.inwords.dagger.annotations.QGameLevel
import com.dreamproject.inwords.data.dto.game.Game
import com.dreamproject.inwords.data.dto.game.GameInfo
import com.dreamproject.inwords.data.dto.game.GameLevel
import com.dreamproject.inwords.data.repository.game.GameEntityProvider
import com.dreamproject.inwords.data.repository.game.GameListProvider
import io.reactivex.Single
import javax.inject.Inject

class GameInteractorImpl @Inject constructor(
        @QGameInfo private val gameInfoRepository: GameListProvider<GameInfo>,
        @QGame private val gameRepository: GameEntityProvider<Game>,
        @QGameLevel private val gameLevelRepository: GameEntityProvider<GameLevel>) : GameInteractor {

    override fun getGameInfos(): Single<List<GameInfo>> {
        return gameInfoRepository.getAll()
                .cache()
    }

    override fun getGame(gameId: Int): Single<Game> {
        return gameRepository.getById(gameId)
                .cache()
    }

    override fun getLevel(levelId: Int): Single<GameLevel> {
        return gameLevelRepository.getById(levelId)
                .cache()
    }

}
