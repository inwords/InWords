package com.dreamproject.inwords.data.repository.game

import io.reactivex.Single

class GameEntityCachingRepository<T>(
        private val databaseRepository: GameDatabaseRepository<T>,
        private val dataProvider: (id: Int) -> Single<T>) : GameEntityProvider<T> {

    override fun getById(id: Int) = dataProvider(id)
            .flatMap { item -> databaseRepository.insertAll(listOf(item)).map { item } }
            .onErrorResumeNext(databaseRepository.getById(id))
}
