package com.dreamproject.inwords.data.repository.profile

import com.dreamproject.inwords.data.dto.User
import io.reactivex.Single

interface UserRepository {
    fun getAuthorisedUser(): Single<User>
    fun getUserById(id: Int): Single<User>
}