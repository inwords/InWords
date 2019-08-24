package ru.inwords.inwords.data.source.webService.session

import retrofit2.HttpException
import java.util.concurrent.atomic.AtomicInteger
import javax.inject.Inject

class SessionHelper @Inject
internal constructor(/*int maxRequests*/) {
    companion object {
        private const val MAX_UNAUTHORISED_REQUESTS = 3
    }

    private val unauthorisedReqThreshold = AtomicInteger(0)

    fun interceptAuthError(throwable: Throwable): Boolean {
        if (throwable is HttpException) {
            when (throwable.code()) {
                401 -> { //TODO find the const
                    unauthorisedReqThreshold.getAndIncrement()
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
