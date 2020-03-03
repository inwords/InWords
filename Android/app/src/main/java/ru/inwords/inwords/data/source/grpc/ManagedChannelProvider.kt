package ru.inwords.inwords.data.source.grpc

import android.content.Context
import io.grpc.ManagedChannel
import io.grpc.cronet.CronetChannelBuilder
import org.chromium.net.CronetEngine
import ru.inwords.inwords.BuildConfig

fun buildManagedChannel(context: Context): ManagedChannel {
    val engine = CronetEngine.Builder(context)
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