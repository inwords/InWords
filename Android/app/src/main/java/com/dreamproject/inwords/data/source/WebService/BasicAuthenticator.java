package com.dreamproject.inwords.data.source.WebService;

import android.support.annotation.NonNull;
import android.support.annotation.Nullable;

import okhttp3.Authenticator;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.Route;

public class BasicAuthenticator implements Authenticator {
    @Nullable
    @Override
    public Request authenticate(@NonNull Route route, @NonNull Response response) {
        /*String header = response.request().header("Authorization");
        if (header != null && header.contains("error_token")) { //TODO: think about COSTIL
            return null; // Give up, we've already failed to authenticate.
        }*/

        AuthToken authToken = WebRequests.INSTANCE.updateToken()
                .onErrorReturnItem(AuthToken.errorToken())
                .blockingGet();

        return response.request().newBuilder()
                .header("Authorization", authToken.getBearer())
                .build();
    }
}