package ru.inwords.inwords.domain.interactor.profile

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.Resource
import ru.inwords.inwords.data.dto.User

interface ProfileInteractor {
    fun getAuthorisedUser(forceUpdate: Boolean = false): Observable<Resource<User>>

    fun getUserById(id: Int): Single<User>

    fun updateUser(newUser: User): Completable
    
    fun clearCache()
}