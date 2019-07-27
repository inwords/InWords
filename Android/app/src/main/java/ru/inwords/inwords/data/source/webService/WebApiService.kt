package ru.inwords.inwords.data.source.webService

import io.reactivex.Completable
import io.reactivex.Single
import retrofit2.http.*
import ru.inwords.inwords.BuildConfig
import ru.inwords.inwords.data.dto.EntityIdentificator
import ru.inwords.inwords.data.dto.User
import ru.inwords.inwords.data.dto.UserCredentials
import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.data.dto.game.*
import ru.inwords.inwords.data.dto.google.TtsSynthesizeRequest
import ru.inwords.inwords.data.dto.google.TtsSynthesizeResponse
import ru.inwords.inwords.data.source.webService.session.TokenResponse
import ru.inwords.inwords.data.sync.PullWordsAnswer

interface WebApiService {
    @GET("/v1.0/values")
    fun getValues(): Single<List<String>>

    //GAME
    @GET("/v1.0/Game/GameInfo")
    fun getGameInfos(@Header("Authorization") bearerToken: String): Single<List<GameInfo>>

    @GET("v1.0/Game/{gameId}")
    fun getGame(@Header("Authorization") bearerToken: String, @Path("gameId") gameId: Int): Single<Game>

    @GET("v1.0/Game/level/{levelId}")
    fun getLevel(@Header("Authorization") bearerToken: String, @Path("levelId") levelId: Int): Single<GameLevel>

    @POST("v1.0/Game/score")
    fun getGameScore(@Header("Authorization") bearerToken: String, @Body levelScoreRequest: LevelScoreRequest): Single<LevelScore>

    @POST("v1.0/Game/UploadScore")
    fun uploadScore(@Header("Authorization") bearerToken: String, @Body levelScoreRequests: List<LevelScoreRequest>): Completable

    //Words
    @POST("/v1.0/words/DeletePair")
    fun deletePairs(@Header("Authorization") bearerToken: String, @Body serverIds: List<Int>): Single<Int>

    @POST("/v1.0/words/addpair")
    fun addPairs(@Header("Authorization") bearerToken: String, @Body wordTranslations: List<WordTranslation>): Single<List<EntityIdentificator>>

    @POST("/v1.0/sync/pullwordpairs")
    fun pullWordsPairs(@Header("Authorization") bearerToken: String, @Body serverIds: List<Int>): Single<PullWordsAnswer>

    //USERS
    @POST("/v1.0/auth/registration")
    @Headers("Content-Type: application/json", "x-api-version: 2.0")
    fun registerUser(@Body userCredentials: UserCredentials): Single<TokenResponse>

    @POST("v1.0/auth/token")
    //TODO think about it
    @Headers("x-api-version: 2.0")
    fun getToken(@Body credentials: UserCredentials): Single<TokenResponse>

    @GET("/v1.0/users")
    fun getAuthorisedUser(@Header("Authorization") bearerToken: String): Single<User>

    @GET("/v1.0/users/{id}")
    fun getUserById(@Header("Authorization") bearerToken: String, @Path("id") id: Int): Single<User>

    @GET("/v1.0/values/getlogin")
    fun getLogin(@Header("Authorization") bearerToken: String): Single<String>

    //GOOGLE
    @POST(BuildConfig.TTS_GOOGLE_API_URL + "/v1beta1/text:synthesize")
    @Headers("content-type: application/json; charset=UTF-8")
    fun ttsSynthesize(@Header("X-Goog-Api-Key") googleApiKey: String, @Body request: TtsSynthesizeRequest): Single<TtsSynthesizeResponse>
}
