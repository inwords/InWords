package com.dreamproject.inwords.data.source.WebService;

import com.dreamproject.inwords.BuildConfig;
import com.dreamproject.inwords.data.entity.User;

import java.util.List;
import java.util.concurrent.TimeUnit;

import io.reactivex.Observable;
import io.reactivex.Single;
import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Headers;
import retrofit2.http.POST;


public interface WebApiService {
    @POST("/api/auth/registration")
    @Headers({"Content-Type: application/json"})
    Observable<AuthToken> registerUser(@Body UserCredentials userCredentials); //TODO: test

    @POST("/api/auth/token")
    Observable<AuthToken> getToken(@Header("Authorization") String credentials); //TODO: test

    @GET("/api/values/getlogin")
    Observable<String> getLogin(@Header("Authorization") String bearerToken); //TODO: test

    @GET("/api/values")
    Observable<List<String>> getValues();

    @GET("/api/users")
    Observable<List<User>> getUsers();

    @POST("/api/users")
    Single<User> addUser(@Body User user);

    /**
     * Factory class for convenient creation of the Api Service interface
     */
    class Factory {
        public static WebApiService create(String baseApiUrl) {
            OkHttpClient okHttpClient = new OkHttpClient.Builder()
                    .addInterceptor(new HttpLoggingInterceptor().
                            setLevel((BuildConfig.DEBUG) ?
                                    HttpLoggingInterceptor.Level.BODY :
                                    HttpLoggingInterceptor.Level.NONE))
                    .authenticator(new BasicAuthenticator())
                    .connectTimeout(5, TimeUnit.SECONDS)
                    .readTimeout(5, TimeUnit.SECONDS)
                    .writeTimeout(5, TimeUnit.SECONDS)
                    .build();

            Retrofit retrofit = new Retrofit.Builder()
                    .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                    .addConverterFactory(GsonConverterFactory.create())
                    .client(okHttpClient)
                    .baseUrl(baseApiUrl)

                    .build();

            return retrofit.create(WebApiService.class);
        }
    }

}
