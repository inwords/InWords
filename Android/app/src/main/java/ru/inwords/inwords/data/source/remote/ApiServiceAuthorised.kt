package ru.inwords.inwords.data.source.remote

import io.reactivex.Completable
import io.reactivex.Single
import retrofit2.http.*
import ru.inwords.inwords.game.data.bean.*
import ru.inwords.inwords.profile.data.bean.User
import ru.inwords.inwords.translation.data.bean.EntityIdentificator
import ru.inwords.inwords.translation.data.bean.WordTranslation
import ru.inwords.inwords.translation.data.sync.PullWordsAnswer

interface ApiServiceAuthorised {
    //GAME
    @GET("/v1.0/Game/GameInfo")
    fun getGameInfos(): Single<List<GameInfoResponse>>

    @GET("v1.0/Game/{gameId}")
    fun getGame(@Path("gameId") gameId: Int): Single<GameResponse>

    @GET("v1.0/Game/level/{levelId}")
    fun getLevel(@Path("levelId") levelId: Int): Single<GameLevel>

    @POST("/v1.1/training/estimate")
    fun getLevelScore(@Body levelScoreRequest: TrainingEstimateRequest): Single<TrainingEstimateResponse>

    @Headers("Content-Type: application/json")
    @POST("/v1.0/Game/AddWordsToUserDictionary")
    fun addWordsToUserDictionary(@Body gameId: Int): Completable

    //Words
    @POST("/v1.0/words/DeletePair")
    fun deletePairs(@Body serverIds: List<Int>): Single<Int>

    @POST("/v1.0/words/addpair")
    fun addPairs(@Body wordTranslations: List<@JvmSuppressWildcards WordTranslation>): Single<List<EntityIdentificator>>

    @POST("/v1.0/sync/pullwordpairs")
    fun pullWordsPairs(@Body serverIds: List<Int>): Single<PullWordsAnswer>

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
