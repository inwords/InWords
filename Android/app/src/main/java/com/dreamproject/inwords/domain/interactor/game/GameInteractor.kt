package com.dreamproject.inwords.domain.interactor.game

import com.dreamproject.inwords.data.dto.game.Game
import com.dreamproject.inwords.data.dto.game.GameInfo
import com.dreamproject.inwords.data.dto.game.GameLevel
import io.reactivex.Single

interface GameInteractor {
    fun getGameInfos(): Single<List<GameInfo>>

    fun getGame(gameId: Int): Single<Game>

    fun getLevel(levelId: Int): Single<GameLevel>
}