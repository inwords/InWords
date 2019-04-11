package com.dreamproject.inwords.data.source.webService;

import com.dreamproject.inwords.data.dto.EntityIdentificator;
import com.dreamproject.inwords.data.dto.User;
import com.dreamproject.inwords.data.dto.UserCredentials;
import com.dreamproject.inwords.data.dto.WordTranslation;
import com.dreamproject.inwords.data.dto.game.Game;
import com.dreamproject.inwords.data.dto.game.GameInfo;
import com.dreamproject.inwords.data.dto.game.GameLevel;
import com.dreamproject.inwords.data.dto.game.GameScore;
import com.dreamproject.inwords.data.dto.game.GameScoreRequest;
import com.dreamproject.inwords.data.source.webService.session.TokenResponse;
import com.dreamproject.inwords.data.sync.PullWordsAnswer;

import java.util.List;

import io.reactivex.Single;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface WebApiService {
    //GAME
    @GET("/api/Game/GameInfo")
    Single<List<GameInfo>> getGameInfos(@Header("Authorization") String bearerToken);

    @GET("api/Game/{gameId}")
    Single<Game> getGame(@Header("Authorization") String bearerToken, @Path("gameId") int gameId);

    @GET("api/Game/level/{levelId}")
    Single<GameLevel> getLevel(@Header("Authorization") String bearerToken, @Path("levelId") int levelId);

    @POST("v1.0/api/Game/score")
    Single<GameScore> getGameScore(@Header("Authorization") String bearerToken, @Body GameScoreRequest gameScoreRequest);

    //Words
    @POST("/api/words/DeletePair")
    Single<Integer> deletePairs(@Header("Authorization") String bearerToken, @Body List<Integer> serverIds);

    @POST("/api/words/addpair")
    Single<List<EntityIdentificator>> addPairs(@Header("Authorization") String bearerToken, @Body List<WordTranslation> wordTranslations);

    @POST("/api/sync/pullwordpairs")
    Single<PullWordsAnswer> pullWordsPairs(@Header("Authorization") String bearerToken, @Body List<Integer> serverIds);

    @GET("/api/values")
    Single<List<String>> getValues();

    //USERS
    @POST("/api/auth/registration")
    @Headers({"Content-Type: application/json", "x-api-version: 2.0"})
    Single<TokenResponse> registerUser(@Body UserCredentials userCredentials);

    @POST("/api/auth/token")
    //TODO think about it
    @Headers({"x-api-version: 2.0"})
    Single<TokenResponse> getToken(@Body UserCredentials credentials);

    @GET("/api/users")
    Single<User> getAuthorisedUser(@Header("Authorization") String bearerToken);

    @GET("/api/users/{id}")
    Single<User> getUserById(@Header("Authorization") String bearerToken, @Path("id") int id);

    @GET("/api/values/getlogin")
    Single<String> getLogin(@Header("Authorization") String bearerToken);
}
