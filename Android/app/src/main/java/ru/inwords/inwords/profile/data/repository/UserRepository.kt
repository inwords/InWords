package ru.inwords.inwords.profile.data.repository

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.profile.domain.model.Profile

interface UserRepository {
    fun getAuthorisedUser(forceUpdate: Boolean = false): Observable<Resource<Profile>>
    fun getUserById(id: Int): Single<Profile>
    fun updateUser(newNickName: String, actualProfile: Profile): Completable
    fun requestEmailUpdate(newEmail: String): Completable
    fun clearCache()
    fun postOnLoopback(newUser: Profile)
}