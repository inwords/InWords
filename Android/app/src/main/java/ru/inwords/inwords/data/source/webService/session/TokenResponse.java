package ru.inwords.inwords.data.source.webService.session;

import androidx.annotation.NonNull;

import com.google.gson.annotations.SerializedName;

public class TokenResponse {
    @NonNull
    @SerializedName("token")
    private String token;
    @SerializedName("userId")
    private int userId;

    TokenResponse() {
        this.token = "";
        this.userId = 0;
    }

    private TokenResponse(@NonNull String token, @NonNull int userId) {
        this.token = token;
        this.userId = userId;
    }

    public static TokenResponse errorToken() {
        return new TokenResponse("error_token", 0);
    }

    public boolean isValid() {
        return token.length() > 30; //TODO think about more convenient check
    }

    public String getBearer() {
        return "Bearer " + token;
    }

    public String getAccessToken() {
        return token;
    }
}
