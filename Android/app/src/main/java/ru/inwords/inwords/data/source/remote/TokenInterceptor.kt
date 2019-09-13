package ru.inwords.inwords.data.source.remote

import okhttp3.Interceptor
import okhttp3.Response
import ru.inwords.inwords.data.source.remote.session.AuthInfo
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class TokenInterceptor @Inject internal constructor(private val authInfo: AuthInfo) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()

        if (request.header("Authorization") != null) {
            return chain.proceed(request)
        }

        val token = authInfo.getAuthToken().blockingGet()

        val newRequest = request.newBuilder()
                .addHeader("Authorization", token)
                .build()

        return chain.proceed(newRequest)
    }
}
