package ru.inwords.inwords.profile.data.repository

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.resource.ResourceCachingProvider
import ru.inwords.inwords.profile.converter.ProfileEntityConverter
import ru.inwords.inwords.profile.data.entity.ProfileEntity
import ru.inwords.inwords.profile.domain.model.Profile

class UserCachingRepository(
    private val databaseRepository: UserDatabaseRepository,
    private val remoteRepository: UserRemoteRepository
) : UserRepository {

    private val authorisedUserCachingProviderLocator = ResourceCachingProvider.Locator { createAuthorisedUserCachingProvider() }

    private val profileEntityConverter= ProfileEntityConverter()

    override fun getAuthorisedUser(forceUpdate: Boolean): Observable<Resource<Profile>> {
        val cachingProvider = authorisedUserCachingProviderLocator.getDefault()

        return cachingProvider.observe(forceUpdate)
            .map { profileEntityConverter.convert(it) }
    }

    override fun getUserById(id: Int): Single<Profile> {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun updateUser(newNickName: String, actualProfile: Profile): Completable {
        return remoteRepository.updateUser(newNickName)
            .doOnComplete { postOnLoopback(actualProfile.copy(nickName = newNickName)) }
    }

    override fun requestEmailUpdate(newEmail: String): Completable {
        return remoteRepository.requestEmailUpdate(newEmail)
            .doOnSuccess { authorisedUserCachingProviderLocator.getDefault().askForContentUpdate() }
            .ignoreElement()
    }

    override fun clearCache() {
        authorisedUserCachingProviderLocator.clear()
    }

    override fun postOnLoopback(newUser: Profile) {
        val cachingProvider = authorisedUserCachingProviderLocator.getDefault()

        cachingProvider.postOnLoopback(profileEntityConverter.reverse(newUser))
    }

    private fun createAuthorisedUserCachingProvider(): ResourceCachingProvider<ProfileEntity> {
        return ResourceCachingProvider(
            { data -> databaseRepository.insert(data).map { data } },
            { databaseRepository.getAuthorisedUser() },
            { remoteRepository.getAuthorisedUser() },
            prefetchFromDatabase = true
        )
    }
}
