import { API_ROOT } from '../api';
import { FetchingActions } from './FetchingActions';
import { AccessActions } from './AccessActions';
import { userConstants } from '../constants/userConstants';

const login = userdata => dispatch => {
    dispatch(FetchingActions.fetchingRequest());

    fetch(`${API_ROOT}/Auth/Token`, {
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
};

const register = userdata => dispatch => {
    dispatch(FetchingActions.fetchingRequest());

    fetch(`${API_ROOT}/Auth/Registration`, {
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
};

const logout = () => dispatch => {
    dispatch(AccessActions.accessDenied());
};

const receiveUserInfo = () => (dispatch, getState) => {
    dispatch(FetchingActions.fetchingRequest());

    fetch(`${API_ROOT}/Users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().accessToken}`
        }
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    dispatch(AccessActions.accessDenied());
                }
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
};

const changeUserInfo = userInfo => (dispatch, getState) => {
    dispatch(FetchingActions.fetchingRequest());

    fetch(`${API_ROOT}/Users`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().accessToken}`
        },
        body: JSON.stringify(userInfo)
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    dispatch(AccessActions.accessDenied());
                }
                throw new Error(response.statusText);
            }

            dispatch(FetchingActions.fetchingSuccess());
            dispatch(userInfoChanged(userInfo));
        })
        .catch(err => {
            console.error(err);
            dispatch(FetchingActions.fetchingFailure(new Error('Ошибка обновления профиля')));
        });
};

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

const userInfoReceived = userInfo => ({
    type: userConstants.USER_INFO_RECEIVED,
    userInfo: userInfo
});

const userInfoChanged = userInfo => ({
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
