package com.dreamproject.inwords.data.source.WebService;

import android.support.annotation.NonNull;

public class TokenResponse {
    @NonNull
    private String access_token;
    @NonNull
    private String email;

    TokenResponse() {
        this.access_token = "";
        this.email = "";
    }

    private TokenResponse(@NonNull String access_token, @NonNull String email) {
        this.access_token = access_token;
        this.email = email;
    }

    static TokenResponse errorToken() {
        return new TokenResponse("error_token", "error_mail");
    }

    public boolean isValid() {
        return access_token.length() > 30; //TODO think about more convenient check
    }

    String getBearer() {
        return "Bearer " + access_token;
    }

    String getAccessToken() {
        return access_token;
    }
}
