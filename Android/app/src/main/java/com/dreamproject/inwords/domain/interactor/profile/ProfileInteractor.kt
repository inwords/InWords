package com.dreamproject.inwords.domain.interactor.profile

import com.dreamproject.inwords.data.dto.User
import io.reactivex.Single

interface ProfileInteractor {
    fun getAuthorisedUser(): Single<User>

    fun getUserById(id: Int): Single<User>
}