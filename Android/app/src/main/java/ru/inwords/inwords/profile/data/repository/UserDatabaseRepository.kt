package ru.inwords.inwords.profile.data.repository

import io.reactivex.Single
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.profile.data.entity.ProfileEntity
import ru.inwords.inwords.profile.data.source.UserDao

class UserDatabaseRepository constructor(private val userDao: UserDao) {
    fun insert(user: ProfileEntity): Single<Long> = Single.fromCallable { userDao.insert(user) }
            .subscribeOn(SchedulersFacade.io())

    fun getAuthorisedUser(): Single<ProfileEntity> = userDao.authorisedUser
            .subscribeOn(SchedulersFacade.io())
}