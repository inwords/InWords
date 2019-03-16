package com.dreamproject.inwords.domain.interactor.profile

import com.dreamproject.inwords.data.dto.User
import com.dreamproject.inwords.data.repository.profile.UserRepository
import io.reactivex.Single
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject
import javax.inject.Inject

class ProfileInteractorImpl @Inject constructor(
        private val userRepository: UserRepository) : ProfileInteractor {

    private val userSubject: Subject<User> = PublishSubject.create()

    override fun getAuthorisedUser(): Single<User> = userRepository.getAuthorisedUser()

    override fun getUserById(id: Int): Single<User> = userRepository.getUserById(id).cache()
}
