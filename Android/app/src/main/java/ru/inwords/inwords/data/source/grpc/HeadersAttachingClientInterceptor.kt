package ru.inwords.inwords.data.source.grpc

import io.grpc.*
import io.grpc.ForwardingClientCall.SimpleForwardingClientCall
import ru.inwords.inwords.data.source.remote.session.AuthInfo
import javax.inject.Inject

private class HeaderAttachingClientInterceptor @Inject internal constructor(private val authInfo: AuthInfo) : ClientInterceptor {
    private val key: Metadata.Key<String> = Metadata.Key.of("Authorization", Metadata.ASCII_STRING_MARSHALLER)

    override fun <ReqT, RespT> interceptCall(
        method: MethodDescriptor<ReqT, RespT>, callOptions: CallOptions, next: Channel): ClientCall<ReqT, RespT> {
        return HeaderAttachingClientCall(next.newCall(method, callOptions))
    }

    private inner class HeaderAttachingClientCall<ReqT, RespT>  // Non private to avoid synthetic class

    internal constructor(call: ClientCall<ReqT, RespT>?) : SimpleForwardingClientCall<ReqT, RespT>(call) {
        override fun start(responseListener: Listener<RespT>, headers: Metadata) {

            if (headers.get(key) == AuthInfo.unauthorisedToken.bearer) {
                return super.start(responseListener, headers)
            }

            val token = authInfo.getAuthToken().blockingGet()

            val extraHeaders = Metadata().apply {
                put(key, token.bearer)
            }

            headers.merge(extraHeaders)
            return super.start(responseListener, headers)
        }
    }

}