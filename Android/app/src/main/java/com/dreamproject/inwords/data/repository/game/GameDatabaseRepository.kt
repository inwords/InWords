package com.dreamproject.inwords.data.repository.game

import com.dreamproject.inwords.core.util.SchedulersFacade
import com.dreamproject.inwords.data.source.database.game.GameEntityDao
import io.reactivex.Single

class GameDatabaseRepository<T> constructor(private val gameEntityDao: GameEntityDao<T>) {
    fun getbyId(id: Int): Single<T> = gameEntityDao.getById(id)
            .subscribeOn(SchedulersFacade.io())

    fun getAll(): Single<List<T>> = gameEntityDao.all
            .subscribeOn(SchedulersFacade.io())

    fun insertAll(values: List<T>): Single<List<Long>> = gameEntityDao.insertAll(values)
            .subscribeOn(SchedulersFacade.io())

    fun deleteAll(values: List<T>): Single<Int> = gameEntityDao.deleteAll(values)
            .subscribeOn(SchedulersFacade.io())
}