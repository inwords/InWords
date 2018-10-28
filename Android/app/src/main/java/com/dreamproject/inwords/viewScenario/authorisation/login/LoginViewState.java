package com.dreamproject.inwords.viewScenario.authorisation.login;

public class LoginViewState {
    public enum Status {
        LOADING, SUCCESS, ERROR
    }

    private static LoginViewState SUCCESS_STATE = new LoginViewState(Status.SUCCESS, null);
    private static LoginViewState LOADING_STATE = new LoginViewState(Status.LOADING, null);

    public final Status status;
    public final Throwable throwable;

    LoginViewState(Status status, Throwable throwable) {
        this.status = status;
        this.throwable = throwable;
    }

    public static LoginViewState success() {
        return SUCCESS_STATE;
    }

    public static LoginViewState loading() {
        return LOADING_STATE;
    }

    public static LoginViewState error(Throwable t) {
        return new LoginViewState(Status.ERROR, t);
    }

}
