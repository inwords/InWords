package ru.inwords.inwords.presentation.viewScenario.authorisation;

class AuthorisationViewState {
    public enum Status {
        LOADING, SUCCESS, ERROR, INVALID_EMAIL, INVALID_PASSWORD, INVALID_INPUT
    }

    private static AuthorisationViewState SUCCESS_STATE = new AuthorisationViewState(Status.SUCCESS, null);
    private static AuthorisationViewState LOADING_STATE = new AuthorisationViewState(Status.LOADING, null);

    final Status status;
    final Throwable throwable;
    final String invalidEmailMessage;
    final String invalidPasswordMessage;

    private AuthorisationViewState(Status status, Throwable throwable) {
        this.status = status;
        this.throwable = throwable;
        this.invalidEmailMessage = null;
        this.invalidPasswordMessage = null;
    }

    private AuthorisationViewState(Status status, String invalidEmailMessage, String invalidPasswordMessage) {
        this.status = status;
        this.throwable = null;
        this.invalidEmailMessage = invalidEmailMessage;
        this.invalidPasswordMessage = invalidPasswordMessage;
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

    static AuthorisationViewState invalidEmail(String invalidEmailMessage) {
        return new AuthorisationViewState(Status.INVALID_EMAIL, invalidEmailMessage, null);
    }

    static AuthorisationViewState invalidPassword(String invalidPasswordMessage) {
        return new AuthorisationViewState(Status.INVALID_PASSWORD, null, invalidPasswordMessage);
    }

    static AuthorisationViewState invalidInput(String invalidEmailMessage, String invalidPasswordMessage) {
        return new AuthorisationViewState(Status.INVALID_INPUT, invalidEmailMessage, invalidPasswordMessage);
    }
}
