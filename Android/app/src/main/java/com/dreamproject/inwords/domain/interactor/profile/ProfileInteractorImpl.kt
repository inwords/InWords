package com.dreamproject.inwords.domain.interactor.profile

import com.dreamproject.inwords.data.dto.User
import com.dreamproject.inwords.data.repository.profile.UserRepository
import com.dreamproject.inwords.domain.model.Resource
import io.reactivex.Observable
import io.reactivex.Single
import javax.inject.Inject

class ProfileInteractorImpl @Inject
internal constructor(private val userRepository: UserRepository) : ProfileInteractor {
    override fun getAuthorisedUser(forceUpdate: Boolean): Observable<Resource<User>> {
        return userRepository.getAuthorisedUser(forceUpdate)
    }

    override fun getUserById(id: Int): Single<User> = userRepository.getUserById(id)
}
