import { API_HOST } from '../api-info';
import { ErrorActions } from '../actions/ErrorActions';
import { AccessTokenActions } from '../actions/AccessTokenActions';
import { userConstants } from '../constants/userConstants';

function login(userdata) {
    return dispatch => {
        dispatch(loginRequest());

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
                dispatch(loginSuccess());
                dispatch(ErrorActions.resetErrorMessage());
                dispatch(loginRedirected());
            })
            .catch(err => {
                console.error(err);
                dispatch(loginFailure(new Error('Ошибка авторизации')));
            });
    }
}

const loginRequest = () => ({
    type: userConstants.LOGIN_REQUEST
});

const loginSuccess = () => ({
    type: userConstants.LOGIN_SUCCESS
});

const loginRedirected = () => ({
    type: userConstants.LOGIN_REDIRECTED
});

const loginFailure = (error) => ({
    type: userConstants.LOGIN_FAILURE,
    error: error.message
});

function logout() {
    return dispatch => {
        dispatch(AccessTokenActions.accessTokenInvalid());
    }
}

function register(userdata) {
    return dispatch => {
        dispatch(registerRequest());

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

                dispatch(registerSuccess());
                dispatch(ErrorActions.resetErrorMessage());
                dispatch(registerRedirected());
            })
            .catch(err => {
                console.error(err);
                dispatch(registerFailure(new Error('Ошибка регистрации')));
            });
    }
}

const registerRequest = () => ({
    type: userConstants.REGISTER_REQUEST
});

const registerSuccess = () => ({
    type: userConstants.REGISTER_SUCCESS
});

const registerRedirected = () => ({
    type: userConstants.REGISTER_REDIRECTED
});

const registerFailure = (error) => ({
    type: userConstants.REGISTER_FAILURE,
    error: error.message
});

export const UserActions = {
    login,
    logout,
    register
};
