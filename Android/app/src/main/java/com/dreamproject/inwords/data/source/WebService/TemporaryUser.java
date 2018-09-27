package com.dreamproject.inwords.data.source.WebService;

public class TemporaryUser { //TODO: reimplement next time
    private final String email;
    private final String password;

    public TemporaryUser(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
