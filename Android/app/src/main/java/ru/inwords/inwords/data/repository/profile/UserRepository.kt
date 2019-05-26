package ru.inwords.inwords.data.repository.profile

import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.data.dto.User
import ru.inwords.inwords.domain.model.Resource

interface UserRepository {
    fun getAuthorisedUser(forceUpdate: Boolean = false): Observable<Resource<User>>
    fun getUserById(id: Int): Single<User>
    fun clearCache()
}