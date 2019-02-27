import { API_HOST } from '../api-info';
import { userConstants } from '../constants/userConstants';
import { credentialsConstants } from '../constants/credentialsConstants';

function login(userdata) {
    return dispatch => {
        dispatch({ type: userConstants.LOGIN_REQUEST });

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
                dispatch({
                    type: credentialsConstants.TOKEN_VALID,
                    payload: json.access_token
                });
                dispatch({ type: userConstants.LOGIN_SUCCESS });
                dispatch({ type: userConstants.LOGIN_REDIRECTED });
            })
            .catch(err => {
                console.error(err);
                dispatch({
                    type: userConstants.LOGIN_FAILURE,
                    payload: new Error('Ошибка авторизации')
                });
            });
    }
}

function logout() {
    return dispatch => {
        dispatch({ type: credentialsConstants.TOKEN_INVALID });
    }
}

function register(userdata) {
    return dispatch => {
        dispatch({ type: userConstants.REGISTER_REQUEST });

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
                dispatch({ type: userConstants.REGISTER_SUCCESS });
                dispatch({ type: userConstants.REGISTER_REDIRECTED });
            })
            .catch(err => {
                console.error(err);
                dispatch({
                    type: userConstants.REGISTER_FAILURE,
                    payload: new Error('Ошибка регистрации')
                });
            });
    }
}

export const UserActions = {
    login,
    logout,
    register
};
