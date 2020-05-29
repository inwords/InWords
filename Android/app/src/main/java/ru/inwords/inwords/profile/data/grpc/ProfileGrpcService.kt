package ru.inwords.inwords.profile.data.grpc

import dagger.Lazy
import io.grpc.ManagedChannel
import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.core.utils.unsafeLazy
import ru.inwords.inwords.main_activity.di.annotations.GrpcDefaultChannel
import ru.inwords.inwords.network.grpc.TokenHeaderAttachingClientInterceptor
import ru.inwords.inwords.proto.common.Empty
import ru.inwords.inwords.proto.profile.*

internal class ProfileGrpcService internal constructor(
    @GrpcDefaultChannel managedChannel: Lazy<ManagedChannel>,
    tokenHeaderAttachingClientInterceptor: TokenHeaderAttachingClientInterceptor
) {
    private val profileStub: ProfileGrpc.ProfileBlockingStub by unsafeLazy {
        ProfileGrpc.newBlockingStub(managedChannel.get())
            .withInterceptors(tokenHeaderAttachingClientInterceptor)
    }

    fun requestEmailUpdate(newEmail: String): Single<EmailChangeReply> {
        val request = EmailChangeRequest.newBuilder()
            .setEmail(newEmail)
            .build()

        return Single.fromCallable { profileStub.requestEmailUpdate(request) }
    }

    fun current(): Single<ProfileReply> {
        return Single.fromCallable { profileStub.current(Empty.getDefaultInstance()) }
    }

    fun update(newNickName: String): Completable {
        val request = UpdateRequest.newBuilder()
            .setNickName(newNickName)
            .build()

        return Completable.fromAction { profileStub.update(request) }
    }
}