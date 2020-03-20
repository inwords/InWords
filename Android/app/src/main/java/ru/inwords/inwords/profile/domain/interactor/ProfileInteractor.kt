package ru.inwords.inwords.profile.domain.interactor

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.profile.data.bean.User
import ru.inwords.inwords.profile.data.repository.UserRepository
import javax.inject.Inject

class ProfileInteractor @Inject internal constructor(
    private val userRepository: UserRepository
) {
    fun getAuthorisedUser(forceUpdate: Boolean = false): Observable<Resource<User>> {
        return userRepository.getAuthorisedUser(forceUpdate)
    }

    fun getUserById(id: Int): Single<User> = userRepository.getUserById(id)

    fun updateUser(newUser: User): Completable {
        return userRepository.updateUser(newUser)
    }

    fun clearCache() {
        userRepository.clearCache()
    }
}