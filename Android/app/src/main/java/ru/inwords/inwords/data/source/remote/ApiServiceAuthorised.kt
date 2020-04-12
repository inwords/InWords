package ru.inwords.inwords.data.source.remote

import io.reactivex.Completable
import io.reactivex.Single
import retrofit2.http.*
import ru.inwords.inwords.game.data.bean.TrainingEstimateRequest
import ru.inwords.inwords.game.data.bean.TrainingEstimateResponse
import ru.inwords.inwords.profile.data.bean.User
import ru.inwords.inwords.translation.domain.model.WordTranslation

interface ApiServiceAuthorised {
    //GAME
    @POST("/v1.1/training/estimate")
    fun getLevelScore(@Body levelScoreRequest: TrainingEstimateRequest): Single<TrainingEstimateResponse>

    //USERS

    @GET("/v1.0/users")
    fun getAuthorisedUser(): Single<User>

    @GET("/v1.0/users/{id}")
    fun getUserById(@Path("id") id: Int): Single<User>

    @PUT("/v1.0/users")
    fun updateUser(@Body newUser: User): Completable

    @GET("/v1.0/values/getlogin")
    fun getLogin(): Single<String>

    //dictionary

    @GET("/v1.1/dictionary/training")
    fun getWordsForTraining(): Single<List<WordTranslation>>

    /**
     * Int stands for [WordTranslation.serverId]
     */
    @GET("/v1.1/dictionary/trainingIds")
    fun getIdsForTraining(): Single<List<Int>>
}
