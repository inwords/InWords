package com.dreamproject.inwords.data.source.webService;

import com.dreamproject.inwords.data.dto.EntityIdentificator;
import com.dreamproject.inwords.data.dto.User;
import com.dreamproject.inwords.data.dto.UserCredentials;
import com.dreamproject.inwords.data.dto.WordTranslation;
import com.dreamproject.inwords.data.dto.game.Game;
import com.dreamproject.inwords.data.dto.game.GameInfo;
import com.dreamproject.inwords.data.dto.game.GameLevel;
import com.dreamproject.inwords.data.source.webService.session.TokenResponse;
import com.dreamproject.inwords.data.sync.PullWordsAnswer;

import java.util.List;

import io.reactivex.Single;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Headers;
import retrofit2.http.POST;

public interface WebApiService {
    //GAME
    @GET("sdfsdfsdf")
    Single<List<GameInfo>> getGameInfos(@Header("Authorization") String bearerToken);

    @GET("asdasd")
    Single<Game> getGame(@Header("Authorization") String bearerToken, @Body int gameId);

    @GET("asdasd")
    Single<GameLevel> getLevel(@Header("Authorization") String bearerToken, @Body int levelId);

    //
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
    Single<TokenResponse> getToken(@Body String credentials);

    @GET("/api/values/getlogin")
    Single<String> getLogin(@Header("Authorization") String bearerToken);

    @GET("/api/values")
    Single<List<String>> getValues();

    @GET("/api/users")
    Single<List<User>> getUsers();

    @POST("/api/users")
    Single<User> addUser(@Body User user);
}
