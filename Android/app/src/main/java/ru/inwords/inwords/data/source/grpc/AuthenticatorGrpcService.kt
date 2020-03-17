package ru.inwords.inwords.data.source.grpc

import dagger.Lazy
import io.grpc.ManagedChannel
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.utils.unsafeLazy
import ru.inwords.inwords.dagger.annotations.GrpcDefaultChannel
import ru.inwords.inwords.data.source.remote.session.TokenResponse
import ru.inwords.inwords.profile.data.bean.UserCredentials
import ru.inwords.inwords.proto.auth.AuthenticatorGrpc
import ru.inwords.inwords.proto.auth.OAuthTokenRequest
import ru.inwords.inwords.proto.auth.RegistrationRequest
import ru.inwords.inwords.proto.auth.TokenRequest
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
internal class AuthenticatorGrpcService @Inject constructor(@GrpcDefaultChannel managedChannel: Lazy<ManagedChannel>) {
    private val authenticatorStub: AuthenticatorGrpc.AuthenticatorBlockingStub by unsafeLazy { AuthenticatorGrpc.newBlockingStub(managedChannel.get()) }

    fun getTokenOauth(tokenId: String, serviceName: String): Single<TokenResponse> {
        val request = OAuthTokenRequest.newBuilder()
            .setServiceName(serviceName)
            .setToken(tokenId)
            .build()

        return Observable.fromCallable { authenticatorStub.oAuth(request) }
            .map { TokenResponse(it.token, it.userId) }
            .firstOrError()
    }

    fun getToken(userCredentials: UserCredentials): Single<TokenResponse> {
        val request = TokenRequest.newBuilder()
            .setEmail(userCredentials.email)
            .setPassword(userCredentials.password)
            .build()

        return Observable.fromCallable { authenticatorStub.basic(request) }
            .map { TokenResponse(it.token, it.userId) }
            .firstOrError()
    }

    fun register(userCredentials: UserCredentials): Single<TokenResponse> {
        val request = RegistrationRequest.newBuilder()
            .setEmail(userCredentials.email)
            .setPassword(userCredentials.password)
            .build()

        return Observable.fromCallable { authenticatorStub.register(request) }
            .map { TokenResponse(it.token, it.userId) }
            .firstOrError()
    }
}