package com.dreamproject.inwords.data.repository.game

import io.reactivex.Single

class GameListCacheRepository<T>(
        private val databaseRepository: GameDatabaseRepository<T>,
        private val dataProvider: () -> Single<List<T>>) : GameListProvider<T> {

    override fun getAll(): Single<List<T>> = dataProvider()
            .onErrorResumeNext(databaseRepository.getAll())
            .flatMap { list -> databaseRepository.insertAll(list).map { list } }
}
