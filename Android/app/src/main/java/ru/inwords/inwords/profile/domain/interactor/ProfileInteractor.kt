package ru.inwords.inwords.profile.domain.interactor

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.profile.data.repository.UserRepository
import ru.inwords.inwords.profile.domain.model.Profile
import javax.inject.Inject

class ProfileInteractor @Inject internal constructor(
    private val userRepository: UserRepository
) {
    fun getAuthorisedUser(forceUpdate: Boolean = false): Observable<Resource<Profile>> {
        return userRepository.getAuthorisedUser(forceUpdate)
    }

    fun getUserById(id: Int): Single<Profile> = userRepository.getUserById(id)

    fun updateUser(newNickName: String, actualProfile: Profile): Completable {
        return userRepository.updateUser(newNickName, actualProfile)
    }

    fun requestEmailUpdate(newEmail: String): Completable {
        return userRepository.requestEmailUpdate(newEmail)
    }

    fun clearCache() {
        userRepository.clearCache()
    }
}