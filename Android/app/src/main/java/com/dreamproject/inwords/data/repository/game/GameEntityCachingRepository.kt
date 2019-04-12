package com.dreamproject.inwords.data.repository.game

import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject

class GameEntityCachingRepository<T>(
        private val databaseRepository: GameDatabaseRepository<T>,
        private val remoteDataProvider: (id: Int) -> Single<T>) : GameEntityProvider<T> {

    private val fakeRemoteStream: Subject<T> = PublishSubject.create()

    override fun getById(id: Int): Observable<T> = fakeRemoteStream.mergeWith(remoteDataProvider(id))
            .flatMap { item -> databaseRepository.insertAll(listOf(item)).map { item }.toObservable() }
            .onErrorResumeNext(getLocal(id))

    override fun getLocal(id: Int): Observable<T> = databaseRepository.getById(id).toObservable()

    override fun enqueueStoreLocal(value: T) {
        fakeRemoteStream.onNext(value)
    }
}
