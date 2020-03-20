package ru.inwords.inwords.profile.data.repository

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.resource.ResourceCachingProvider
import ru.inwords.inwords.profile.data.bean.User

class UserCachingRepository(
    private val databaseRepository: UserDatabaseRepository,
    private val remoteRepository: UserRemoteRepository
) : UserRepository {

    private val authorisedUserCachingProviderLocator = ResourceCachingProvider.Locator { createAuthorisedUserCachingProvider() }

    override fun getAuthorisedUser(forceUpdate: Boolean): Observable<Resource<User>> {
        val cachingProvider = authorisedUserCachingProviderLocator.getDefault()

        return cachingProvider.observe(forceUpdate)
    }

    override fun getUserById(id: Int): Single<User> {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun updateUser(newUser: User): Completable {
        return remoteRepository.updateUser(newUser)
            .doOnComplete { postOnLoopback(newUser) }
    }

    override fun clearCache() {
        authorisedUserCachingProviderLocator.clear()
    }

    override fun postOnLoopback(newUser: User) {
        val cachingProvider = authorisedUserCachingProviderLocator.getDefault()

        cachingProvider.postOnLoopback(newUser)
    }

    private fun createAuthorisedUserCachingProvider(): ResourceCachingProvider<User> {
        return ResourceCachingProvider(
            { data -> databaseRepository.insert(data).map { data } },
            { databaseRepository.getAuthorisedUser() },
            { remoteRepository.getAuthorisedUser() },
            prefetchFromDatabase = true
        )
    }
}
