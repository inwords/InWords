package ru.inwords.inwords.core.resource

import android.annotation.SuppressLint
import android.util.Log
import io.reactivex.Maybe
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.functions.Function
import io.reactivex.subjects.BehaviorSubject
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import java.io.InterruptedIOException
import java.util.concurrent.atomic.AtomicBoolean

/**
 * @property databaseInserter not wrapped as resource: calling onError if error
 * @property databaseGetter not wrapped as resource: calling onError if no items
 * @property remoteDataProvider same rules
 * @property prefetchFromDatabase whether or not fetch data from database directly before remote
 */
class ResourceCachingProvider<T : Any>(
    private val databaseInserter: (T) -> Single<T>, //should be interface getAll insertAll only
    private val databaseGetter: () -> Single<T>, //should be interface getAll insertAll only
    private val remoteDataProvider: () -> Single<T>, //null if not prefetch
    private val prefetchFromDatabase: Boolean = false
) {
    private val askForContentStream: Subject<Unit> = PublishSubject.create()
    private val fakeRemoteStream: Subject<Resource<T>> = PublishSubject.create()

    private val resourceStream: Subject<Resource<T>> = BehaviorSubject.create()

    private var shouldAskForUpdate = AtomicBoolean(false)
    private var inProgress = AtomicBoolean(false)

    private val remoteObservable = if (prefetchFromDatabase) {
        Maybe.concatArrayEager(databaseGetter().wrapResourceSkipError(Source.PREFETCH), remoteDataProvider().wrapNetworkResource()).toObservable()
    } else {
        remoteDataProvider().wrapNetworkResource().toObservable()
    }

    init {
        askForContentStream //TODO loading state emit somewhere
            .observeOn(SchedulersFacade.io())
            .doOnNext { inProgress.set(true) }
            .switchMap {
                fakeRemoteStream.mergeWith(remoteObservable.subscribeOn(SchedulersFacade.io()))
            }
            .flatMapSingle { res ->
                when (res) {
                    is Resource.Success -> {
                        if (res.source == Source.PREFETCH) {
                            Single.just(res)
                        } else {
                            databaseInserter(res.data)
                                .doOnError { Log.e(TAG, it.message.orEmpty()) }
                                .wrapDatabaseInserterResource(res, res.source)
                        }
                    }
                    is Resource.Loading -> Single.just(res)
                    is Resource.Error -> {
                        Log.e(TAG, res.message.orEmpty())
                        databaseGetter().wrapResource(Source.CACHE)
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

    fun askForDatabaseContent() {
        val t = Throwable("askForDatabaseContent")
        fakeRemoteStream.onNext(Resource.Error(t.message, t, Source.NOT_SET))
    }

    fun postOnLoopback(value: T) {
        fakeRemoteStream.onNext(Resource.Success(value, Source.NOT_SET))
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

    private fun Single<T>.wrapDatabaseInserterResource(onErrorResource: Resource<T>, source: Source): Single<Resource<T>> {
        return map { Resource.Success(it, source) as Resource<T> }
            .onErrorReturn { onErrorResource }
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
                cachingProvidersMap.values.forEach {
                    it.invalidateContent()
                }
                cachingProvidersMap.clear()
            }
        }
    }

    companion object {
        const val TAG: String = "ResourceCachingProvider"
    }
}

fun <T : Any> Single<T>.wrapResource(source: Source): Single<Resource<T>> {
    return map { Resource.Success(it, source) as Resource<T> }
        .onErrorReturn { Resource.Error(it.message, it, source) }
}

internal fun <T : Any> Single<T>.wrapNetworkResource(): Maybe<Resource<T>> {
    return map { Resource.Success(it, Source.NETWORK) as Resource<T> }
        .toMaybe()
        .onErrorResumeNext(Function {
            if (it is InterruptedIOException || it is InterruptedException) {
                Log.e(ResourceCachingProvider.TAG, "Interrupted exception intercepted: ${it.message.orEmpty()}")
                Maybe.empty<Resource<T>>()
            } else {
                Maybe.just(Resource.Error(it.message, it, Source.NETWORK))
            }
        })
}

internal fun <T : Any> Single<T>.wrapResourceSkipError(source: Source): Maybe<Resource<T>> {
    return map { Resource.Success(it, source) as Resource<T> }
        .toMaybe()
        .onErrorResumeNext(Maybe.empty<Resource<T>>())
}