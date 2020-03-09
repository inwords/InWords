package ru.inwords.inwords.core.resource

import android.annotation.SuppressLint
import android.util.Log
import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.subjects.BehaviorSubject
import io.reactivex.subjects.PublishSubject
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import java.util.concurrent.atomic.AtomicBoolean

/**
 * @property databaseInserter not wrapped as resource: calling onError if error
 * @property finalValueProvider not wrapped as resource: calling onError if no items
 * @property remoteDataProvider same rules
 */
internal class ResourceCachingProviderWithFinalValue<T : Any, V : Any>(
    private val databaseInserter: (T) -> Completable, //should be interface getAll insertAll only
    private val finalValueProvider: () -> Single<V>,
    private val remoteDataProvider: (V?) -> Single<T>,
    private val prefetchFinalValue: Boolean = false
) {
    private val askForContentStream = PublishSubject.create<Unit>()

    private val askForFinalValue = BehaviorSubject.createDefault(Unit)

    private val resourceStream = BehaviorSubject.create<Resource<V>>()

    private var shouldAskForUpdate = AtomicBoolean(false)
    private var inProgress = AtomicBoolean(false)

    init {
        askForContentStream //TODO loading state emit somewhere
            .observeOn(SchedulersFacade.io())
            .doOnNext { inProgress.set(true) }
            .flatMapSingle {
                if (prefetchFinalValue) {
                    finalValueProvider()
                        .doOnSuccess { resourceStream.onNext(Resource.Success(it, Source.PREFETCH)) }
                        .wrapResource(Source.PREFETCH)
                } else {
                    Single.just(Resource.Loading<V>())
                }
            }
            .switchMapMaybe {
                val finalValue = if (it is Resource.Success) it.data else null

                remoteDataProvider(finalValue)
                    .subscribeOn(SchedulersFacade.io())
                    .wrapNetworkResource()
            }
            .flatMapSingle { res ->
                when (res) {
                    is Resource.Success -> databaseInserter(res.data)
                        .doOnError { Log.e(TAG, it.message.orEmpty()) }
                        .onErrorComplete()
                        .andThen(Single.just(res))
                    is Resource.Loading -> Single.just(res)
                    is Resource.Error -> Single.just(res)
                }
            }
            .flatMap { res ->
                val finalValue = finalValueProvider().wrapResource(
                    when (res) {
                        is Resource.Success -> res.source
                        is Resource.Loading -> res.source
                        is Resource.Error -> Source.CACHE
                    }
                )

                askForFinalValue.flatMapSingle { finalValue }
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

    fun askForFinalValue() {
        askForFinalValue.onNext(Unit)
    }

    fun invalidateContent() {
        shouldAskForUpdate.set(true)
    }

    fun observe(forceUpdate: Boolean = false): Observable<Resource<V>> {
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

    class Locator<T : Any, V : Any>(private val factory: (Int) -> ResourceCachingProviderWithFinalValue<T, V>) {
        @SuppressLint("UseSparseArrays")
        private val cachingProvidersMap = HashMap<Int, ResourceCachingProviderWithFinalValue<T, V>>()

        fun get(id: Int): ResourceCachingProviderWithFinalValue<T, V> {
            synchronized(cachingProvidersMap) {
                return cachingProvidersMap.getOrPut(id) { factory(id) }
            }
        }

        fun getDefault(): ResourceCachingProviderWithFinalValue<T, V> {
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