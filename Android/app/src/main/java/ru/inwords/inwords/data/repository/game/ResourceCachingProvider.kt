package ru.inwords.inwords.data.repository.game

import android.annotation.SuppressLint
import android.util.Log
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.subjects.BehaviorSubject
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject
import ru.inwords.inwords.domain.model.Resource

/**
 * @param databaseInserter not wrapped as resource: calling onError if error
 * @param databaseGetter not wrapped as resource: calling onError if no items
 * @param remoteDataProvider same rules
 */
internal class ResourceCachingProvider<T : Any>(
        private val databaseInserter: (T) -> Single<T>, //should be interface getAll insertAll only
        private val databaseGetter: () -> Single<T>, //should be interface getAll insertAll only
        private val remoteDataProvider: () -> Single<T>) {

    private val askForContentStream: Subject<Unit> = PublishSubject.create()
    private val fakeRemoteStream: Subject<Resource<T>> = PublishSubject.create()

    private val resourceStream: Subject<Resource<T>> = BehaviorSubject.create()

    private var shouldAskForUpdate = false

    init {
        askForContentStream //TODO loading state emit somewhere
                .flatMap { fakeRemoteStream.mergeWith(remoteDataProvider().wrapResource()) }
                .flatMapSingle { res ->
                    if (res.success()) {
                        databaseInserter(res.data!!)
                                .doOnError { Log.d(TAG, it.message) }
                                .wrapResourceOverwriteError(res)
                    } else {
                        Log.d(TAG, res.message)
                        databaseGetter().wrapResource()
                    }
                }
                .doOnNext { shouldAskForUpdate = it.error() }
                .subscribe(resourceStream)

        askForContentUpdate()
    }

    fun askForContentUpdate() {
        askForContentStream.onNext(Unit)
    }

    fun postOnLoopback(value: T) {
        fakeRemoteStream.onNext(Resource.success(value))
    }

    fun observe(): Observable<Resource<T>> {
        if (shouldAskForUpdate) {
            askForContentUpdate()
        }

        return resourceStream
    }

    private fun Single<T>.wrapResourceOverwriteError(onErrorResource: Resource<T>): Single<Resource<T>> {
        return map { Resource.success(it) }
                .onErrorReturn { onErrorResource }
    }

    @SuppressLint("UseSparseArrays")
    class Locator<T : Any> {
        private val cachingProvidersMap = HashMap<Int, ResourceCachingProvider<T>>()

        fun get(id: Int, factory: (Int) -> ResourceCachingProvider<T>): ResourceCachingProvider<T> {
            return cachingProvidersMap.getOrPut(id) { factory(id) }
        }
    }

    companion object {
        const val TAG: String = "ResourceCachingProvider"
    }
}

fun <T : Any> Single<T>.wrapResource(): Single<Resource<T>> {
    return map { Resource.success(it) }
            .onErrorReturn { Resource.error(it.message, null) }
}