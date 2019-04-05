package com.dreamproject.inwords.domain.interactor.game

import com.dreamproject.inwords.data.dto.game.GameLevel
import com.dreamproject.inwords.domain.model.GameModel
import com.dreamproject.inwords.domain.model.GamesInfoModel
import io.reactivex.Single

interface GameInteractor {
    fun getGamesInfo(): Single<GamesInfoModel>

    fun getGame(gameId: Int): Single<GameModel>

    fun getLevel(levelId: Int): Single<GameLevel>
}