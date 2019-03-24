package com.dreamproject.inwords.data.repository.profile

import android.util.Log
import com.dreamproject.inwords.data.dto.User
import io.reactivex.Single

class UserCachingRepository(
        private val databaseRepository: UserDatabaseRepository,
        private val remoteRepository: UserRemoteRepository) : UserRepository {

    override fun getAuthorisedUser(): Single<User> = remoteRepository.getAuthorisedUser()
            .flatMap { item ->
                databaseRepository.insert(item)
                        .doOnError { Log.d(TAG, it.message) }
                        .onErrorReturnItem(0)
                        .map { item }
            }
            .doOnError { Log.d(TAG, it.message) }
            .onErrorResumeNext(databaseRepository.getAuthorisedUser())

    override fun getUserById(id: Int): Single<User> {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    companion object {
        const val TAG = "UserCachingRepository"
    }
}
