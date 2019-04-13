package com.dreamproject.inwords.data.repository.profile

import com.dreamproject.inwords.data.dto.User
import com.dreamproject.inwords.data.repository.game.ResourceCachingProvider
import com.dreamproject.inwords.domain.model.Resource
import io.reactivex.Observable
import io.reactivex.Single

class UserCachingRepository(
        private val databaseRepository: UserDatabaseRepository,
        private val remoteRepository: UserRemoteRepository) : UserRepository {

    private val authorisedUserCachingProvider by lazy { createAuthorisedUserCachingProvider() }

    override fun getAuthorisedUser(forceUpdate: Boolean): Observable<Resource<User>> {
        if (forceUpdate) {
            authorisedUserCachingProvider.askForContentUpdate()
        }

        return authorisedUserCachingProvider.observe()
    }

    override fun getUserById(id: Int): Single<User> {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    private fun createAuthorisedUserCachingProvider(): ResourceCachingProvider<User> {
        return ResourceCachingProvider(
                { data -> databaseRepository.insert(data).map { data } },
                { databaseRepository.getAuthorisedUser() },
                { remoteRepository.getAuthorisedUser() })
    }
}
