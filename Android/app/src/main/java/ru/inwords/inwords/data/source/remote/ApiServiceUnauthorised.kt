package ru.inwords.inwords.data.source.remote

import io.reactivex.Single
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.Headers
import retrofit2.http.POST
import ru.inwords.inwords.BuildConfig
import ru.inwords.inwords.texttospeech.data.bean.TtsSynthesizeRequest
import ru.inwords.inwords.texttospeech.data.bean.TtsSynthesizeResponse

interface ApiServiceUnauthorised {
    //GOOGLE
    @POST(BuildConfig.TTS_GOOGLE_API_URL + "/v1beta1/text:synthesize")
    @Headers("content-type: application/json; charset=UTF-8")
    fun ttsSynthesize(@Header("X-Goog-Api-Key") googleApiKey: String, @Body request: TtsSynthesizeRequest): Single<TtsSynthesizeResponse>
}
