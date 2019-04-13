package com.dreamproject.inwords.data.repository.profile

import com.dreamproject.inwords.data.dto.User
import com.dreamproject.inwords.domain.model.Resource
import io.reactivex.Observable
import io.reactivex.Single

interface UserRepository {
    fun getAuthorisedUser(forceUpdate: Boolean = false): Observable<Resource<User>>
    fun getUserById(id: Int): Single<User>
}