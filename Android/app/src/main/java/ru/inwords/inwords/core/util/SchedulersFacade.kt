package ru.inwords.inwords.core.util

import io.reactivex.Scheduler
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

/**
 * Provides various threading schedulers.
 */
object SchedulersFacade {
    /**
     * IO thread pool scheduler
     */
    fun io(): Scheduler = Schedulers.io()

    /**
     * Computation thread pool scheduler
     */
    fun computation(): Scheduler = Schedulers.computation()

    /**
     * Main Thread scheduler
     */
    fun ui(): Scheduler = AndroidSchedulers.mainThread()

    /**
     * Single Thread scheduler
     */
    fun single(): Scheduler = Schedulers.single()
}
