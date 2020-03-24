package ru.inwords.inwords.data.source.remote

import android.content.Context
import io.grpc.ManagedChannel
import io.grpc.cronet.CronetChannelBuilder
import org.chromium.net.ExperimentalCronetEngine
import ru.inwords.inwords.BuildConfig
import ru.inwords.inwords.core.grpc.LoggingClientInterceptor

fun buildManagedChannel(context: Context): ManagedChannel {
    val engine = ExperimentalCronetEngine.Builder(context)
        .enableQuic(true)
        .build()
    return CronetChannelBuilder.forAddress(BuildConfig.GRPC_API_URL, 443, engine)
        .apply {
            if (BuildConfig.DEBUG) {
                intercept(LoggingClientInterceptor())
            }
        }
        .build()
}