package ru.inwords.inwords.profile.data.repository

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.data.source.remote.WebRequestsManagerAuthorised
import ru.inwords.inwords.profile.converter.ProfileReplyConverter
import ru.inwords.inwords.profile.data.entity.ProfileEntity
import javax.inject.Inject

class UserRemoteRepository @Inject constructor(private val webRequestsManagerAuthorised: WebRequestsManagerAuthorised) {
    private val profileConverter = ProfileReplyConverter()

    fun getAuthorisedUser(): Single<ProfileEntity> = webRequestsManagerAuthorised.getAuthorisedUser()
        .map { profileConverter.convert(it) }

    fun updateUser(newNickName:String): Completable = webRequestsManagerAuthorised.updateUser(newNickName)

    fun requestEmailUpdate(newEmail: String): Single<String> = webRequestsManagerAuthorised.requestEmailUpdate(newEmail)
        .map { it.email }
}
