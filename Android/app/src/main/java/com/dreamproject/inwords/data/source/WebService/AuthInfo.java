package com.dreamproject.inwords.data.source.WebService;

public class AuthInfo {
    private AuthToken authToken;
    private String credentials;

    AuthInfo() {
        this.authToken = new AuthToken();
        this.credentials = "";
    }

    public AuthInfo(AuthToken authToken, String credentials) {
        this.authToken = authToken;
        this.credentials = credentials;
    }

    AuthToken getAuthToken() {
        return authToken;
    }

    String getCredentials() {
        return credentials;
    }

    public void setAuthToken(AuthToken authToken) {
        this.authToken = authToken;
    }

    public void setCredentials(String credentials) {
        this.credentials = credentials;
    }
}
