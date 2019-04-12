package com.dreamproject.inwords.data.repository.game

import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject

class GameListCachingRepository<T>(
        private val databaseRepository: GameDatabaseRepository<T>,
        private val remoteDataProvider: () -> Single<List<T>>) : GameListProvider<T> {

    private val fakeRemoteStream: Subject<List<T>> = PublishSubject.create()

    override fun getAll(): Observable<List<T>> = fakeRemoteStream.mergeWith(remoteDataProvider())
            .flatMap { list -> databaseRepository.insertAll(list).map { list }.toObservable() }
            .onErrorResumeNext(getLocal())

    override fun getLocal(): Observable<List<T>> = databaseRepository.getAll()
            .filter { it.isNotEmpty() }
            .toSingle().toObservable()

    override fun enqueueStoreLocal(value: List<T>) {
        fakeRemoteStream.onNext(value)
    }
}
