package com.dreamproject.inwords.data.source.webService

import okhttp3.Interceptor
import okhttp3.Response
import javax.inject.Inject

class HeadersInterceptor @Inject internal constructor() : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()

        val newRequest = request.newBuilder()
                .addHeader("x-api-version", "2.0")
                .build()
        return chain.proceed(newRequest)
    }
}
