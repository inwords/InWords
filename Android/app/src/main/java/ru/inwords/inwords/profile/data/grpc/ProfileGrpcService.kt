package ru.inwords.inwords.profile.data.grpc

import dagger.Lazy
import io.grpc.ManagedChannel
import io.reactivex.Single
import ru.inwords.inwords.authorisation.data.session.NativeTokenHolder
import ru.inwords.inwords.core.grpc.HeaderAttachingClientInterceptor
import ru.inwords.inwords.core.utils.unsafeLazy
import ru.inwords.inwords.dagger.annotations.GrpcDefaultChannel
import ru.inwords.inwords.proto.profile.EmailChangeReply
import ru.inwords.inwords.proto.profile.EmailChangeRequest
import ru.inwords.inwords.proto.profile.ProfileGrpc
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
internal class ProfileGrpcService @Inject constructor(
    @GrpcDefaultChannel managedChannel: Lazy<ManagedChannel>,
    nativeTokenHolder: NativeTokenHolder
) {
    private val profileStub: ProfileGrpc.ProfileBlockingStub by unsafeLazy {
        ProfileGrpc.newBlockingStub(managedChannel.get())
            .withInterceptors(HeaderAttachingClientInterceptor(nativeTokenHolder))
    }

    fun requestEmailUpdate(newEmail: String): Single<EmailChangeReply> {
        val request = EmailChangeRequest.newBuilder()
            .setEmail(newEmail)
            .build()

        return Single.fromCallable { profileStub.requestEmailUpdate(request) }
    }
}