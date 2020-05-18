package ru.inwords.inwords.translation.data.sync

import android.util.Log
import io.reactivex.Completable
import io.reactivex.schedulers.Schedulers
import io.reactivex.subjects.PublishSubject
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.translation.data.deferred.WordTranslationDeferredAdapterHolder
import java.util.concurrent.TimeUnit
import java.util.concurrent.atomic.AtomicInteger

class TranslationSyncController internal constructor(
    private val adapterHolder: WordTranslationDeferredAdapterHolder
) {
    private val dataChangesCounter: AtomicInteger = AtomicInteger()
    private val dataChangedNotifier: PublishSubject<Int> = PublishSubject.create()

    init {
        establishSyncAllReposWithCacheWatcher()
    }

    private fun establishSyncAllReposWithCacheWatcher() {
        dataChangedNotifier
            .debounce(2, TimeUnit.SECONDS)
            .doOnNext {
                adapterHolder.tryUploadUpdatesToRemote()
                    .subscribeOn(Schedulers.io())
                    .subscribe({ }, { t -> Log.e(javaClass.simpleName, t.message.orEmpty()) })
            }
            .subscribe()
    }

    fun notifyDataChanged() {
        dataChangedNotifier.onNext(dataChangesCounter.incrementAndGet())
    }

    fun presyncOnStart(forceUpdate: Boolean): Completable {
        return adapterHolder.retrieveAll(forceUpdate)
            .firstOrError()
            .subscribeOn(SchedulersFacade.io())
            .doOnSuccess { Log.d(javaClass.simpleName, it.toString()) }
            .ignoreElement()
    }

}
