package com.dreamproject.inwords.data.source.WebService;

import android.support.annotation.NonNull;
import android.support.annotation.Nullable;

import com.dreamproject.inwords.util.DependenciesComponent;

import okhttp3.Authenticator;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.Route;

public class BasicAuthenticator implements Authenticator {
    @Nullable
    @Override
    public Request authenticate(@NonNull Route route, @NonNull Response response) {
        final AuthToken errorToken = AuthToken.errorToken();

        String header = response.request().header("Authorization");
        if (header != null && header.contains(errorToken.getAccessToken())) { //TODO: think about COSTIL
            return null; // Give up, we've already failed to authenticate.
        }

        AuthToken authToken = DependenciesComponent.getWebRequestsInstance().updateToken()
                .onErrorReturnItem(errorToken)
                .blockingGet();

        return response.request().newBuilder()
                .header("Authorization", authToken.getBearer())
                .build();
    }
}