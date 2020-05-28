package ru.inwords.inwords.profile.data.repository

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.network.AuthorisedRequestsManager
import ru.inwords.inwords.profile.converter.ProfileReplyConverter
import ru.inwords.inwords.profile.data.entity.ProfileEntity
import ru.inwords.inwords.profile.data.grpc.ProfileGrpcService

class UserRemoteRepository internal constructor(
    private val authorisedRequestsManager: AuthorisedRequestsManager,
    private val profileGrpcService: ProfileGrpcService
) {
    private val profileConverter = ProfileReplyConverter()

    fun getAuthorisedUser(): Single<ProfileEntity> = authorisedRequestsManager.wrapRequest(profileGrpcService.current())
        .map { profileConverter.convert(it) }

    fun updateUser(newNickName: String): Completable = authorisedRequestsManager.wrapRequest(profileGrpcService.update(newNickName))

    fun requestEmailUpdate(newEmail: String): Single<String> = authorisedRequestsManager.wrapRequest(profileGrpcService.requestEmailUpdate(newEmail))
        .map { it.email }
}
