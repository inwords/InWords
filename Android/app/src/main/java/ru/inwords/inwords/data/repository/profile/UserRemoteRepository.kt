package ru.inwords.inwords.data.repository.profile

import io.reactivex.Single
import ru.inwords.inwords.data.dto.User
import ru.inwords.inwords.data.source.webService.WebRequestsManager
import javax.inject.Inject

class UserRemoteRepository @Inject constructor(private val webRequestsManager: WebRequestsManager) {
    fun getAuthorisedUser(): Single<User> = webRequestsManager.getAuthorisedUser()

    fun getUserById(id: Int): Single<User> = webRequestsManager.getUserById(id)
}
