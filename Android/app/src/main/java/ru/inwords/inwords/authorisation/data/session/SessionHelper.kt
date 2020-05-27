package ru.inwords.inwords.authorisation.data.session

import android.util.Log
import io.grpc.Status
import io.grpc.StatusRuntimeException
import java.util.concurrent.atomic.AtomicInteger
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class SessionHelper @Inject internal constructor(/*int maxRequests*/) {
    companion object {
        private const val MAX_UNAUTHORISED_REQUESTS = 3
    }

    private val unauthorisedReqThreshold = AtomicInteger(0)

    fun interceptAuthError(throwable: Throwable): Boolean {
        if (throwable is StatusRuntimeException) {
            when (throwable.status) {
                Status.UNAUTHENTICATED -> {
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

    fun requireThreshold() {
        if (unauthorisedReqThreshold.get() > MAX_UNAUTHORISED_REQUESTS) {
            throw RuntimeException("Threshold reached") //TODO make normal exception
        }
    }

    fun resetThreshold() {
        unauthorisedReqThreshold.set(0)
    }
}
