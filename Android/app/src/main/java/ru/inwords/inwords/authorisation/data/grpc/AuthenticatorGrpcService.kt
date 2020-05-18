package ru.inwords.inwords.authorisation.data.grpc

import dagger.Lazy
import io.grpc.ManagedChannel
import io.reactivex.Single
import ru.inwords.inwords.authorisation.data.session.TokenResponse
import ru.inwords.inwords.core.utils.unsafeLazy
import ru.inwords.inwords.main_activity.di.annotations.GrpcDefaultChannel
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

        return Single.fromCallable { authenticatorStub.oAuth(request) }
            .map { TokenResponse(it.token, it.userId) }
    }

    fun getToken(userCredentials: UserCredentials): Single<TokenResponse> {
        val request = TokenRequest.newBuilder()
            .setEmail(userCredentials.email)
            .setPassword(userCredentials.password)
            .build()

        return Single.fromCallable { authenticatorStub.basic(request) }
            .map { TokenResponse(it.token, it.userId) }
    }

    fun register(userCredentials: UserCredentials, isAnonymous: Boolean): Single<TokenResponse> {
        val request = RegistrationRequest.newBuilder()
            .setIsAnonymous(isAnonymous)
            .setEmail(userCredentials.email)
            .setPassword(userCredentials.password)
            .build()

        return Single.fromCallable { authenticatorStub.register(request) }
            .map { TokenResponse(it.token, it.userId) }
    }
}