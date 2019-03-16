package com.dreamproject.inwords.data.repository.profile

import com.dreamproject.inwords.data.dto.User
import com.dreamproject.inwords.data.source.webService.WebRequestsManager
import io.reactivex.Single
import javax.inject.Inject

class UserRemoteRepository @Inject constructor(private val webRequestsManager: WebRequestsManager) {
    fun getAuthorisedUser(): Single<User> = webRequestsManager.authorisedUser

    fun getUserById(id: Int): Single<User> = webRequestsManager.getUserById(id)
}
