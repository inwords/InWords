package ru.inwords.inwords.data.repository.profile

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.Resource
import ru.inwords.inwords.data.dto.User

interface UserRepository {
    fun getAuthorisedUser(forceUpdate: Boolean = false): Observable<Resource<User>>
    fun getUserById(id: Int): Single<User>
    fun updateUser(newUser: User): Completable
    fun clearCache()
    fun postOnLoopback(newUser: User)
}