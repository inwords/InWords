package ru.inwords.inwords.data.source.remote

import io.reactivex.Single
import retrofit2.http.*
import ru.inwords.inwords.BuildConfig
import ru.inwords.inwords.data.source.remote.session.TokenResponse
import ru.inwords.inwords.profile.data.bean.UserCredentials
import ru.inwords.inwords.texttospeech.data.bean.TtsSynthesizeRequest
import ru.inwords.inwords.texttospeech.data.bean.TtsSynthesizeResponse

interface ApiServiceUnauthorised {
    @GET("/v1.0/values")
    fun getValues(): Single<List<String>>

    //USERS
    @POST("/v1.0/auth/registration")
    @Headers("Content-Type: application/json", "x-api-version: 2.0")
    fun registerUser(@Body userCredentials: UserCredentials): Single<TokenResponse>

    @POST("v1.0/auth/token")
    //TODO think about it
    @Headers("x-api-version: 2.0")
    fun getToken(@Body credentials: UserCredentials): Single<TokenResponse>

    //GOOGLE
    @POST(BuildConfig.TTS_GOOGLE_API_URL + "/v1beta1/text:synthesize")
    @Headers("content-type: application/json; charset=UTF-8")
    fun ttsSynthesize(@Header("X-Goog-Api-Key") googleApiKey: String, @Body request: TtsSynthesizeRequest): Single<TtsSynthesizeResponse>
}
