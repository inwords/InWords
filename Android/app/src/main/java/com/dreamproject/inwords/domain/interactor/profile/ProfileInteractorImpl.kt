package com.dreamproject.inwords.domain.interactor.profile

import com.dreamproject.inwords.data.dto.User
import com.dreamproject.inwords.data.repository.profile.ProfileRemoteRepository
import io.reactivex.Single
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject
import javax.inject.Inject

class ProfileInteractorImpl @Inject constructor(
        private val profileRemoteRepository: ProfileRemoteRepository) : ProfileInteractor {

    private val userSubject: Subject<User> = PublishSubject.create()

    override fun getAuthorisedUser(): Single<User> = profileRemoteRepository.getAuthorisedUser()

    override fun getUserById(id: Int): Single<User> = profileRemoteRepository.getUserById(id).cache()
}
