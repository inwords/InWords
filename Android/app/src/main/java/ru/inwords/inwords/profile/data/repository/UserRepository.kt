package ru.inwords.inwords.profile.data.repository

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.profile.data.bean.User

interface UserRepository {
    fun getAuthorisedUser(forceUpdate: Boolean = false): Observable<Resource<User>>
    fun getUserById(id: Int): Single<User>
    fun updateUser(newUser: User): Completable
    fun requestEmailUpdate(newEmail: String): Completable
    fun clearCache()
    fun postOnLoopback(newUser: User)
}