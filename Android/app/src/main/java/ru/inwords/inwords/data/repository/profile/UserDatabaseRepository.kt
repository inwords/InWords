package ru.inwords.inwords.data.repository.profile

import io.reactivex.Single
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.User
import ru.inwords.inwords.data.source.database.UserDao

class UserDatabaseRepository constructor(private val userDao: UserDao) {
    fun insert(user: User): Single<Long> = Single.fromCallable { userDao.insert(user) }
            .subscribeOn(SchedulersFacade.io())

    fun getAuthorisedUser(): Single<User> = userDao.authorisedUser
            .subscribeOn(SchedulersFacade.io())
}