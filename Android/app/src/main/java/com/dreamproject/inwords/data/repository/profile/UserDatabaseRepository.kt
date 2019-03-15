package com.dreamproject.inwords.data.repository.profile

import com.dreamproject.inwords.core.util.SchedulersFacade
import com.dreamproject.inwords.data.dto.User
import com.dreamproject.inwords.data.source.database.UserDao
import io.reactivex.Single

class UserDatabaseRepository constructor(private val userDao: UserDao) {
    fun insert(user: User): Single<Long> = Single.fromCallable { userDao.insert(user) }
            .subscribeOn(SchedulersFacade.io())

    fun getAuthorisedUser(): Single<User> = userDao.authorisedUser
            .subscribeOn(SchedulersFacade.io())
}