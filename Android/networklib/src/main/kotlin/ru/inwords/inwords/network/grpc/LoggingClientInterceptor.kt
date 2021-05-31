package ru.inwords.inwords.network.grpc

import android.util.Log
import io.grpc.*
import io.grpc.ForwardingClientCall.SimpleForwardingClientCall

class LoggingClientInterceptor : ClientInterceptor {
    override fun <ReqT : Any?, RespT : Any?> interceptCall(method: MethodDescriptor<ReqT, RespT>, callOptions: CallOptions, next: Channel): ClientCall<ReqT, RespT> {
        return object : SimpleForwardingClientCall<ReqT, RespT>(next.newCall(method, callOptions)) {
            override fun sendMessage(message: ReqT) {
                Log.d(TAG, "${method.fullMethodName} --- request content: \n${message.toString()}")
                super.sendMessage(message)
            }

            override fun start(responseListener: Listener<RespT>, headers: Metadata?) {
                val listener: Listener<RespT> = object : ForwardingClientCallListener<RespT>() {
                    override fun delegate(): Listener<RespT> {
                        return responseListener
                    }

                    override fun onMessage(message: RespT) {
                        Log.d(TAG, "${method.fullMethodName} --- response content: \n${message.toString()}")
                        super.onMessage(message)
                    }
                }
                super.start(listener, headers)
            }
        }
    }

    companion object {
        const val TAG = "GRPC"
    }
}