package ru.inwords.inwords.authorisation.data

import okhttp3.Interceptor
import okhttp3.Response
import ru.inwords.inwords.authorisation.data.session.NativeTokenHolder
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class TokenInterceptor @Inject internal constructor(private val nativeTokenHolder: NativeTokenHolder) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()

        if (request.header("Authorization") == NativeTokenHolder.unauthorisedToken.bearer) {
            return chain.proceed(request)
        }

        val token = nativeTokenHolder.getAuthToken()

        val newRequest = request.newBuilder()
            .addHeader("Authorization", token.bearer)
            .build()

        return chain.proceed(newRequest)
    }
}
