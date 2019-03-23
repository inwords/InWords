package com.dreamproject.inwords.domain.interactor.profile

import com.dreamproject.inwords.data.dto.User
import com.dreamproject.inwords.data.repository.profile.UserRepository
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.subjects.BehaviorSubject
import io.reactivex.subjects.Subject
import javax.inject.Inject

class ProfileInteractorImpl @Inject
internal constructor(private val userRepository: UserRepository) : ProfileInteractor {
    private val userSubject: Subject<User> = BehaviorSubject.create()

    override fun getAuthorisedUser(forceUpdate: Boolean): Observable<User> {
        if (forceUpdate) {
            userRepository.getAuthorisedUser().subscribe(userSubject::onNext)
        }

        return userSubject
    }

    override fun getUserById(id: Int): Single<User> = userRepository.getUserById(id)
}
