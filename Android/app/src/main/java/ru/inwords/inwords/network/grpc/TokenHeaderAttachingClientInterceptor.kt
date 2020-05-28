package ru.inwords.inwords.network.grpc

import io.grpc.*
import io.grpc.ForwardingClientCall.SimpleForwardingClientCall
import ru.inwords.inwords.authorisation.data.session.NativeTokenHolder

class TokenHeaderAttachingClientInterceptor internal constructor(
    private val nativeTokenHolder: NativeTokenHolder
) : ClientInterceptor {
    private val key: Metadata.Key<String> = Metadata.Key.of("Authorization", Metadata.ASCII_STRING_MARSHALLER)

    override fun <ReqT, RespT> interceptCall(
        method: MethodDescriptor<ReqT, RespT>,
        callOptions: CallOptions,
        next: Channel
    ): ClientCall<ReqT, RespT> {
        return HeaderAttachingClientCall(next.newCall(method, callOptions))
    }

    inner class HeaderAttachingClientCall<ReqT, RespT>  // Non private to avoid synthetic class

    internal constructor(call: ClientCall<ReqT, RespT>?) : SimpleForwardingClientCall<ReqT, RespT>(call) {
        override fun start(responseListener: Listener<RespT>, headers: Metadata) {

            if (nativeTokenHolder.isUnauthorisedBearer(headers.get(key))) {
                return super.start(responseListener, headers)
            }

            val token = nativeTokenHolder.getAuthToken()

            val extraHeaders = Metadata().apply {
                put(key, token.bearer)
            }

            headers.merge(extraHeaders)
            return super.start(responseListener, headers)
        }
    }

}