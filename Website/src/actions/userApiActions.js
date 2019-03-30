import { apiAction } from './apiAction';
import { accessActions } from './accessActions';
import { userActions } from './userActions';

function login(userdata) {
    return apiAction({
        endpoint: 'Auth/Token',
        method: 'POST',
        data: JSON.stringify(userdata),
        onSuccess: [
            accessActions.grantAccess,
            userActions.redirect,
            userActions.redirected
        ],
        errorMessage: 'Ошибка авторизации'
    });
}

function register(userdata) {
    return apiAction({
        endpoint: 'Auth/Registration',
        method: 'POST',
        data: JSON.stringify(userdata),
        onSuccess: [
            userActions.redirect,
            userActions.redirected
        ],
        errorMessage: 'Ошибка регистрации'
    });
}

function receiveUserInfo() {
    return apiAction({
        endpoint: 'Users',
        onSuccess: [userActions.userInfoReceived],
        errorMessage: 'Ошибка загрузки профиля'
    });
};

function changeUserInfo(userInfo) {
    return apiAction({
        endpoint: 'Users',
        method: 'PUT',
        data: JSON.stringify(userInfo),
        onSuccess: [() => userActions.userInfoChanged(userInfo)],
        errorMessage: 'Ошибка редактирования профиля'
    });
};

export const userApiActions = {
    login,
    register,
    receiveUserInfo,
    changeUserInfo
};
