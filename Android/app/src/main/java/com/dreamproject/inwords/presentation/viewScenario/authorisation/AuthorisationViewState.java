package com.dreamproject.inwords.presentation.viewScenario.authorisation;

class AuthorisationViewState {
    public enum Status {
        LOADING, SUCCESS, ERROR
    }

    private static AuthorisationViewState SUCCESS_STATE = new AuthorisationViewState(Status.SUCCESS, null);
    private static AuthorisationViewState LOADING_STATE = new AuthorisationViewState(Status.LOADING, null);

    final Status status;
    final Throwable throwable;

    private AuthorisationViewState(Status status, Throwable throwable) {
        this.status = status;
        this.throwable = throwable;
    }

    static AuthorisationViewState success() {
        return SUCCESS_STATE;
    }

    static AuthorisationViewState loading() {
        return LOADING_STATE;
    }

    static AuthorisationViewState error(Throwable t) {
        return new AuthorisationViewState(Status.ERROR, t);
    }

}
