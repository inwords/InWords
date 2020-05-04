package ru.inwords.inwords.data.source.remote

import io.reactivex.Completable
import io.reactivex.Single
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.PUT
import ru.inwords.inwords.profile.data.bean.User

interface ApiServiceAuthorised {
    //USERS
    @GET("/v1.0/users")
    fun getAuthorisedUser(): Single<User>

    @PUT("/v1.0/users")
    fun updateUser(@Body newUser: User): Completable
}
