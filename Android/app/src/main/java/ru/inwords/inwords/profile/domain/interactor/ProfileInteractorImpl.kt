package ru.inwords.inwords.profile.domain.interactor

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.profile.data.bean.User
import ru.inwords.inwords.profile.data.repository.UserRepository
import javax.inject.Inject

class ProfileInteractorImpl @Inject
internal constructor(private val userRepository: UserRepository) : ProfileInteractor {
    override fun getAuthorisedUser(forceUpdate: Boolean): Observable<Resource<User>> {
        return userRepository.getAuthorisedUser(forceUpdate)
    }

    override fun getUserById(id: Int): Single<User> = userRepository.getUserById(id)

    override fun updateUser(newUser: User): Completable {
        return userRepository.updateUser(newUser)
                .doOnComplete { userRepository.postOnLoopback(newUser) }
    }

    override fun clearCache() {
        userRepository.clearCache()
    }
}
