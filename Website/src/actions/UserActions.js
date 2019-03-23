import { API_HOST } from '../api-info';
import { FetchingActions } from './FetchingActions';
import { AccessActions } from './AccessActions';
import { userConstants } from '../constants/userConstants';

function login(userdata) {
    return (dispatch) => {
        dispatch(FetchingActions.fetchingRequest());

        fetch(API_HOST + '/api/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Version': '2.0'
            },
            body: JSON.stringify(userdata)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                dispatch(FetchingActions.fetchingSuccess());
                dispatch(AccessActions.accessGranted(data.access_token));
                dispatch(loginRedirect());
                dispatch(loginRedirected());
            })
            .catch(err => {
                console.error(err);
                dispatch(FetchingActions.fetchingFailure(new Error('Ошибка авторизации')));
            });
    }
}

function register(userdata) {
    return (dispatch) => {
        dispatch(FetchingActions.fetchingRequest());

        fetch(API_HOST + '/api/auth/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userdata)
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

function logout() {
    return (dispatch) => {
        dispatch(AccessActions.accessDenied());
    }
}

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
                    AccessActions.handleAccessError(response, dispatch);
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

function changeUserInfo(userInfo) {
    return (dispatch, getState) => {
        dispatch(FetchingActions.fetchingRequest());

        fetch(API_HOST + '/api/Users/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getState().accessToken
            },
            body: JSON.stringify(userInfo)
        })
            .then(response => {
                if (!response.ok) {
                    AccessActions.handleAccessError(response, dispatch);
                    throw new Error(response.statusText);
                }

                dispatch(FetchingActions.fetchingSuccess());
                dispatch(userInfoChanged(userInfo));
            })
            .catch(err => {
                console.error(err);
                dispatch(FetchingActions.fetchingFailure(new Error('Ошибка обновления профиля')));
            });
    }
}

const loginRedirect = () => ({
    type: userConstants.LOGIN_REDIRECT
});

const loginRedirected = () => ({
    type: userConstants.LOGIN_REDIRECTED
});

const registerRedirect = () => ({
    type: userConstants.REGISTER_REDIRECT
});

const registerRedirected = () => ({
    type: userConstants.REGISTER_REDIRECTED
});

const userInfoReceived = (userInfo) => ({
    type: userConstants.USER_INFO_RECEIVED,
    userInfo: userInfo
});

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