package ru.inwords.inwords.data.source.webService.session;

import ru.inwords.inwords.data.dto.UserCredentials;

public class AuthInfo {
    private TokenResponse tokenResponse;
    private UserCredentials credentials;

    public AuthInfo() {
        this.tokenResponse = new TokenResponse();
        this.credentials = new UserCredentials();
    }

    public AuthInfo(TokenResponse tokenResponse, UserCredentials credentials) {
        this.tokenResponse = tokenResponse;
        this.credentials = credentials;
    }

    public TokenResponse getTokenResponse() {
        return tokenResponse;
    }

    public UserCredentials getCredentials() {
        return credentials;
    }

    public void setTokenResponse(TokenResponse tokenResponse) {
        this.tokenResponse = tokenResponse;
    }

    public void setCredentials(UserCredentials credentials) {
        this.credentials = credentials;
    }
}
