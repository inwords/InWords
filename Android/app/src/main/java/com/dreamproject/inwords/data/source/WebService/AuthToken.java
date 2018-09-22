package com.dreamproject.inwords.data.source.WebService;

import android.support.annotation.NonNull;

public class AuthToken {
    @NonNull
    private String access_token;
    @NonNull
    private String email;

    AuthToken() {
        this.access_token = "";
        this.email = "";
    }

    AuthToken(@NonNull String access_token, @NonNull String email) {
        this.access_token = access_token;
        this.email = email;
    }

    public boolean isValid() {
        return !access_token.isEmpty();
    }

    public String getBearer() {
        return "Bearer " + access_token;
    }

    public String getAccessToken() {
        return access_token;
    }

    @NonNull
    public String getEmail() {
        return email;
    }
}
