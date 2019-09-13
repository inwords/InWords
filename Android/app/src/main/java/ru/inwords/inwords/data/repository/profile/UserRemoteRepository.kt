package ru.inwords.inwords.data.repository.profile

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.data.dto.User
import ru.inwords.inwords.data.source.remote.WebRequestsManagerAuthorised
import javax.inject.Inject

class UserRemoteRepository @Inject constructor(private val webRequestsManagerAuthorised: WebRequestsManagerAuthorised) {
    fun getAuthorisedUser(): Single<User> = webRequestsManagerAuthorised.getAuthorisedUser()

    fun getUserById(id: Int): Single<User> = webRequestsManagerAuthorised.getUserById(id)

    fun updateUser(newUser: User): Completable = webRequestsManagerAuthorised.updateUser(newUser)
}
