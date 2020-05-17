package ru.inwords.inwords.core.grpc

import android.content.Context
import io.grpc.ManagedChannel
import io.grpc.cronet.CronetChannelBuilder
import org.chromium.net.ExperimentalCronetEngine
import ru.inwords.inwords.BuildConfig
import java.util.concurrent.TimeUnit

fun buildManagedChannel(context: Context, grpcApiUrl: String): ManagedChannel {
    val engine = ExperimentalCronetEngine.Builder(context)
        .enableQuic(true)
        .build()
    return CronetChannelBuilder.forAddress(grpcApiUrl, 443, engine)
        .idleTimeout(10, TimeUnit.MINUTES)
        .apply {
            if (BuildConfig.DEBUG) {
                intercept(LoggingClientInterceptor())
            }
        }
        .build()
}