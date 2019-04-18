package ru.inwords.inwords.domain.interactor.profile

import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.data.dto.User
import ru.inwords.inwords.data.repository.profile.UserRepository
import ru.inwords.inwords.domain.model.Resource
import javax.inject.Inject

class ProfileInteractorImpl @Inject
internal constructor(private val userRepository: UserRepository) : ProfileInteractor {
    override fun getAuthorisedUser(forceUpdate: Boolean): Observable<Resource<User>> {
        return userRepository.getAuthorisedUser(forceUpdate)
    }

    override fun getUserById(id: Int): Single<User> = userRepository.getUserById(id)
}
