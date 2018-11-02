package com.dreamproject.inwords.data.source.WebService;

import com.dreamproject.inwords.data.entity.EntityIdentificator;
import com.dreamproject.inwords.data.entity.User;
import com.dreamproject.inwords.data.entity.UserCredentials;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.sync.PullWordsAnswer;

import java.util.List;

import io.reactivex.Single;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Headers;
import retrofit2.http.POST;


public interface WebApiService {
    @POST("/api/words/DeletePair")
    Single<Integer> deletePairs(@Header("Authorization") String bearerToken, @Body List<Integer> serverIds);

    @POST("/api/words/addpair")
    Single<List<EntityIdentificator>> addPairs(@Header("Authorization") String bearerToken, @Body List<WordTranslation> wordTranslations);

    @POST("/api/sync/pullwordpairs")
    Single<PullWordsAnswer> pullWordsPairs(@Header("Authorization") String bearerToken, @Body List<Integer> serverIds);

    @POST("/api/auth/registration")
    @Headers({"Content-Type: application/json"})
    Single<TokenResponse> registerUser(@Body UserCredentials userCredentials);

    @POST("/api/auth/token")
    Single<TokenResponse> getToken(@Header("Authorization") String credentials);

    @GET("/api/values/getlogin")
    Single<String> getLogin(@Header("Authorization") String bearerToken);

    @GET("/api/values")
    Single<List<String>> getValues();

    @GET("/api/users")
    Single<List<User>> getUsers();

    @POST("/api/users")
    Single<User> addUser(@Body User user);
}
