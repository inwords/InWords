package ru.inwords.inwords.network

import android.util.Log
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.subjects.BehaviorSubject
import ru.inwords.inwords.core.error_handler.NetworkException
import ru.inwords.inwords.core.error_handler.NetworkRequestStatus
import ru.inwords.inwords.core.rxjava.ObservableTransformers
import java.util.concurrent.atomic.AtomicInteger

class SessionHelper internal constructor(/*int maxRequests*/) {
    private val unauthorisedReqThreshold = AtomicInteger(0)

    private val authenticatedNotifierSubject = BehaviorSubject.create<Boolean>()

    fun registerPossibleAuthError(throwable: Throwable): Boolean {
        if (throwable is NetworkException) {
            when (throwable.status) {
                NetworkRequestStatus.UNAUTHENTICATED -> {
                    val count = unauthorisedReqThreshold.getAndIncrement()
                    Log.d(javaClass.simpleName, "unauthorisedReqThreshold = $count")
                    return true
                }
                else -> {
                }
            }
        }

        return false
    }

    fun notifyAuthStateChanged(authorised: Boolean) {
        if (authorised) {
            resetThreshold()
        }
        authenticatedNotifierSubject.onNext(authorised)
    }

    fun valve(): Single<Unit> {
        return Observable.just(Unit)
            .doOnNext { requireThreshold() }
            .compose(ObservableTransformers.valve(authenticatedNotifierSubject, false))
            .firstOrError()
    }

    private fun requireThreshold() {
        if (unauthorisedReqThreshold.get() > MAX_UNAUTHORISED_REQUESTS) {
            throw RuntimeException("Threshold reached") //TODO make normal exception
        }
    }

    private fun resetThreshold() {
        unauthorisedReqThreshold.set(0)
    }

    companion object {
        private const val MAX_UNAUTHORISED_REQUESTS = 3
    }
}
