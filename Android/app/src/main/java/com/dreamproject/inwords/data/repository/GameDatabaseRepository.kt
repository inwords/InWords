package com.dreamproject.inwords.data.repository

import com.dreamproject.inwords.core.util.SchedulersFacade
import com.dreamproject.inwords.data.source.database.game.GameEntityDao
import io.reactivex.Single

class GameDatabaseRepository<T> constructor(private val gameDao: GameEntityDao<T>) {
    fun getbyId(gameId: Int): Single<T> = gameDao.getById(gameId)
            .subscribeOn(SchedulersFacade.io())

    fun getAll(): Single<List<T>> = gameDao.all
            .subscribeOn(SchedulersFacade.io())

    fun insertAll(games: List<T>): Single<List<Long>> = gameDao.insertAll(games)
            .subscribeOn(SchedulersFacade.io())

    fun deleteAll(games: List<T>): Single<Int> = gameDao.deleteAll(games)
            .subscribeOn(SchedulersFacade.io())
}