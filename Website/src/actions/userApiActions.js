import apiAction from './apiAction';
import accessActions from './accessActions';
import userActions from './userActions';

function login(userdata) {
    return apiAction({
        endpoint: 'Auth/Token',
        method: 'POST',
        data: JSON.stringify(userdata),
        actionsOnSuccess: [accessActions.grantAccess],
        redirection: '/wordlist',
        errorMessage: 'Ошибка авторизации'
    });
}

function register(userdata) {
    return apiAction({
        endpoint: 'Auth/Registration',
        method: 'POST',
        data: JSON.stringify(userdata),
        redirection: '/login',
        errorMessage: 'Ошибка регистрации'
    });
}

function receiveUserInfo() {
    return apiAction({
        endpoint: 'Users',
        actionsOnSuccess: [userActions.initializeUserInfo],
        errorMessage: 'Ошибка загрузки профиля'
    });
};

function changeUserInfo(userInfo) {
    return apiAction({
        endpoint: 'Users',
        method: 'PUT',
        data: JSON.stringify(userInfo),
        actionsOnSuccess: [() => userActions.updateUserInfo(userInfo)],
        errorMessage: 'Ошибка редактирования профиля'
    });
};

const userApiActions = {
    login,
    register,
    receiveUserInfo,
    changeUserInfo
};

export default userApiActions;
