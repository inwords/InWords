import { API_HOST } from '../api-info';
import { FetchingActions } from './FetchingActions';
import { AccessTokenActions } from './AccessTokenActions';
import { ErrorActions } from './ErrorActions';
import { userConstants } from '../constants/userConstants';
import { stringifyFormData } from '../helpers/stringifyFormData';

function login(formUserdata) {
    return (dispatch) => {
        dispatch(FetchingActions.fetchingRequest());

        fetch(API_HOST + '/api/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Version': '2.0'
            },
            body: stringifyFormData(formUserdata)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                dispatch(FetchingActions.fetchingSuccess());
                dispatch(AccessTokenActions.accessTokenValid(data.access_token));
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
    return (dispatch) => {
        dispatch(AccessTokenActions.accessTokenInvalid());
    }
}

function register(formUserdata) {
    return (dispatch) => {
        dispatch(FetchingActions.fetchingRequest());

        fetch(API_HOST + '/api/auth/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: stringifyFormData(formUserdata)
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

function receiveUserInfo() {
    return (dispatch, getState) => {
        dispatch(FetchingActions.fetchingRequest());

        fetch(API_HOST + '/api/Users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getState().accessToken
            }
        })
            .then(response => {
                if (!response.ok) {
                    AccessTokenActions.handleAccessError(response, dispatch);
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                dispatch(FetchingActions.fetchingSuccess());
                dispatch(userInfoReceived(data));
            })
            .catch(err => {
                console.error(err);
                dispatch(FetchingActions.fetchingFailure(new Error('Ошибка загрузки профиля')));
            });
    }
}

const userInfoReceived = (userInfo) => ({
    type: userConstants.USER_INFO_RECEIVED,
    userInfo: userInfo
});

function changeUserInfo(userInfo) {
    return (dispatch, getState) => {
        dispatch(FetchingActions.fetchingRequest());

        fetch(API_HOST + '/api/Users/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getState().accessToken
            },
            body: stringifyFormData(userInfo)
        })
            .then(response => {
                if (!response.ok) {
                    AccessTokenActions.handleAccessError(response, dispatch);
                    throw new Error(response.statusText);
                }

                dispatch(FetchingActions.fetchingSuccess());
                dispatch(userInfoChanged(JSON.parse(stringifyFormData(userInfo))));

                if (getState().errorMessage) {
                    dispatch(ErrorActions.resetErrorMessage());
                }
            })
            .catch(err => {
                console.error(err);
                dispatch(FetchingActions.fetchingFailure(new Error('Ошибка обновления профиля')));
            });
    }
}

const userInfoChanged = (userInfo) => ({
    type: userConstants.USER_INFO_CHANGED,
    userInfo: userInfo
});

export const UserActions = {
    login,
    logout,
    register,
    receiveUserInfo,
    changeUserInfo
};
