package ru.inwords.inwords.data.repository

import android.annotation.SuppressLint
import android.util.Log
import io.reactivex.Maybe
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.subjects.BehaviorSubject
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.domain.model.Resource
import java.io.InterruptedIOException
import java.util.concurrent.atomic.AtomicBoolean

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

    private var shouldAskForUpdate = AtomicBoolean(false)
    private var inProgress = AtomicBoolean(false)

    init {
        askForContentStream //TODO loading state emit somewhere
                .observeOn(SchedulersFacade.io())
                .doOnNext { inProgress.set(true) }
                .switchMap {
                    fakeRemoteStream.mergeWith(remoteDataProvider()
                            .subscribeOn(SchedulersFacade.io())
                            .wrapNetworkResource())
                }
                .flatMapSingle { res ->
                    when (res) {
                        is Resource.Success -> databaseInserter(res.data)
                                .doOnError { Log.e(TAG, it.message.orEmpty()) }
                                .wrapResourceOverwriteError(res)
                        is Resource.Loading -> Single.just(res)
                        is Resource.Error -> {
                            Log.e(TAG, res.message.orEmpty())
                            databaseGetter().wrapResource()
                        }
                    }
                }
                .doOnNext {
                    shouldAskForUpdate.set(it is Resource.Error)
                    inProgress.set(false)
                }
                .subscribe(resourceStream)

        askForContentUpdate()
    }

    fun askForContentUpdate() {
        shouldAskForUpdate.set(false)

        askDirectForContentUpdate()
    }

    fun invalidateContent() {
        shouldAskForUpdate.set(true)
    }

    fun postOnLoopback(value: T) {
        fakeRemoteStream.onNext(Resource.Success(value))
    }

    fun observe(forceUpdate: Boolean = false): Observable<Resource<T>> {
        return if (forceUpdate || shouldAskForUpdate.compareAndSet(true, false)) {
            val resourceStream = if (inProgress.get()) {
                this.resourceStream
            } else {
                this.resourceStream.skip(1)
            }
            askDirectForContentUpdate()
            resourceStream
        } else {
            resourceStream
        }
    }

    private fun askDirectForContentUpdate() {
        askForContentStream.onNext(Unit)
    }

    private fun Single<T>.wrapResourceOverwriteError(onErrorResource: Resource<T>): Single<Resource<T>> {
        return map { Resource.Success(it) as Resource<T> }
                .onErrorReturn { onErrorResource }
    }

    private fun <T : Any> Single<T>.wrapNetworkResource(): Maybe<Resource<T>> {
        return map { Resource.Success(it) as Resource<T> }
                .onErrorReturn {
                    if (it is InterruptedIOException || it is InterruptedException) {
                        Log.e(TAG, "Interrupted exception intercepted: ${it.message.orEmpty()}")
                        Resource.Loading() //used as a marker to be skipped
                    } else {
                        Resource.Error(it.message, it)
                    }
                }
                .filter { it !is Resource.Loading }
    }

    class Locator<T : Any>(private val factory: (Int) -> ResourceCachingProvider<T>) {
        @SuppressLint("UseSparseArrays")
        private val cachingProvidersMap = HashMap<Int, ResourceCachingProvider<T>>()

        fun get(id: Int): ResourceCachingProvider<T> {
            synchronized(cachingProvidersMap) {
                return cachingProvidersMap.getOrPut(id) { factory(id) }
            }
        }

        fun getDefault(): ResourceCachingProvider<T> {
            return get(Int.MAX_VALUE)
        }

        fun clear() {
            synchronized(cachingProvidersMap) {
                cachingProvidersMap.clear()
            }
        }
    }

    companion object {
        const val TAG: String = "ResourceCachingProvider"
    }
}

fun <T : Any> Single<T>.wrapResource(): Single<Resource<T>> {
    return map { Resource.Success(it) as Resource<T> }
            .onErrorReturn { Resource.Error(it.message, it) }
}