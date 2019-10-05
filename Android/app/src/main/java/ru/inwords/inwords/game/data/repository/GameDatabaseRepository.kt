package ru.inwords.inwords.game.data.repository

import io.reactivex.Single
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.game.data.source.GameEntityDao

class GameDatabaseRepository<T> constructor(private val gameEntityDao: GameEntityDao<T>) {
    fun getById(id: Int): Single<T> = gameEntityDao.getById(id)
            .subscribeOn(SchedulersFacade.io())

    fun getAll(): Single<List<T>> = gameEntityDao.all
            .filter { it.isNotEmpty() }.toSingle() //to get error on empty
            .subscribeOn(SchedulersFacade.io())

    fun insertAll(values: List<T>): Single<List<Long>> = gameEntityDao.insertAll(values)
            .subscribeOn(SchedulersFacade.io())

    fun deleteAll(values: List<T>): Single<Int> = gameEntityDao.deleteAll(values)
            .subscribeOn(SchedulersFacade.io())
}