package ru.inwords.inwords.profile.data.repository

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.data.source.remote.WebRequestsManagerAuthorised
import ru.inwords.inwords.profile.data.bean.User
import javax.inject.Inject

class UserRemoteRepository @Inject constructor(private val webRequestsManagerAuthorised: WebRequestsManagerAuthorised) {
    fun getAuthorisedUser(): Single<User> = webRequestsManagerAuthorised.getAuthorisedUser()

    fun getUserById(id: Int): Single<User> = webRequestsManagerAuthorised.getUserById(id)

    fun updateUser(newUser: User): Completable = webRequestsManagerAuthorised.updateUser(newUser.copy(account = null))

    fun requestEmailUpdate(newEmail: String): Single<String> = webRequestsManagerAuthorised.requestEmailUpdate(newEmail)
        .map { it.email }
}
