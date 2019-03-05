import { API_HOST } from '../api-info';
import { FetchingActions } from '../actions/FetchingActions';
import { AccessTokenActions } from '../actions/AccessTokenActions';
import { userConstants } from '../constants/userConstants';

function login(userdata) {
    return dispatch => {
        dispatch(FetchingActions.fetchingRequest());

        fetch(API_HOST + '/api/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Version': '2.0'
            },
            body: userdata
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                return response.json();
            })
            .then(json => {
                dispatch(AccessTokenActions.accessTokenValid(json.access_token));
                dispatch(FetchingActions.fetchingSuccess());
                dispatch(loginRedirect());
                dispatch(loginRedirected());
            })
            .catch(err => {
                console.error(err);
                dispatch(FetchingActions.fetchingFailure(new Error('Ошибка авторизации')));
            });
    }
}

const loginRedirect = () => ({
    type: userConstants.LOGIN_REDIRECT
});

const loginRedirected = () => ({
    type: userConstants.LOGIN_REDIRECTED
});

function logout() {
    return dispatch => {
        dispatch(AccessTokenActions.accessTokenInvalid());
    }
}

function register(userdata) {
    return dispatch => {
        dispatch(FetchingActions.fetchingRequest());

        fetch(API_HOST + '/api/auth/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: userdata
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                dispatch(FetchingActions.fetchingSuccess());
                dispatch(registerRedirect());
                dispatch(registerRedirected());
            })
            .catch(err => {
                console.error(err);
                dispatch(FetchingActions.fetchingFailure(new Error('Ошибка регистрации')));
            });
    }
}

const registerRedirect = () => ({
    type: userConstants.REGISTER_REDIRECT
});

const registerRedirected = () => ({
    type: userConstants.REGISTER_REDIRECTED
});

export const UserActions = {
    login,
    logout,
    register
};
