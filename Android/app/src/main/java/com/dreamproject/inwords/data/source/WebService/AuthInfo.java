package com.dreamproject.inwords.data.source.WebService;

public class AuthInfo {
    private TokenResponse tokenResponse;
    private String credentials;

    AuthInfo() {
        this.tokenResponse = new TokenResponse();
        this.credentials = "";
    }

    public AuthInfo(TokenResponse tokenResponse, String credentials) {
        this.tokenResponse = tokenResponse;
        this.credentials = credentials;
    }

    TokenResponse getTokenResponse() {
        return tokenResponse;
    }

    String getCredentials() {
        return credentials;
    }

    public void setTokenResponse(TokenResponse tokenResponse) {
        this.tokenResponse = tokenResponse;
    }

    public void setCredentials(String credentials) {
        this.credentials = credentials;
    }
}
