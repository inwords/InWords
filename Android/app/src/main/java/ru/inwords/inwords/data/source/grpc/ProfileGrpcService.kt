package ru.inwords.inwords.data.source.grpc

import dagger.Lazy
import io.grpc.ManagedChannel
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.utils.unsafeLazy
import ru.inwords.inwords.dagger.annotations.GrpcDefaultChannel
import ru.inwords.inwords.data.source.remote.session.TokenResponse
import ru.inwords.inwords.profile.data.bean.UserCredentials
import ru.inwords.inwords.proto.profile.ProfileGrpc
import ru.inwords.inwords.proto.profile.RegistrationRequest
import ru.inwords.inwords.proto.profile.TokenRequest
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
internal class ProfileGrpcService @Inject constructor(@GrpcDefaultChannel managedChannel: Lazy<ManagedChannel>) {
    private val profileStub: ProfileGrpc.ProfileBlockingStub by unsafeLazy { ProfileGrpc.newBlockingStub(managedChannel.get()) }

    fun getToken(userCredentials: UserCredentials): Single<TokenResponse> {
        val request = TokenRequest.newBuilder()
            .setEmail(userCredentials.email)
            .setPassword(userCredentials.password)
            .build()

        return Observable.fromCallable { profileStub.getToken(request) }
            .map { TokenResponse(it.token, it.userId) }
            .firstOrError()
    }

    fun register(userCredentials: UserCredentials): Single<TokenResponse> {
        val request = RegistrationRequest.newBuilder()
            .setEmail(userCredentials.email)
            .setPassword(userCredentials.password)
            .build()

        return Observable.fromCallable { profileStub.register(request) }
            .map { TokenResponse(it.token, it.userid) }
            .firstOrError()
    }
}