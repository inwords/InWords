import { combineReducers } from 'redux';
import { userConstants } from '../constants/userConstants';

const login = (state = { redirect: false }, action) => {
    switch (action.type) {
        case userConstants.LOGIN_REDIRECT:
            return { ...state, redirect: true };
        case userConstants.LOGIN_REDIRECTED:
            return { ...state, redirect: false };
        default:
            return state;
    }
};

const register = (state = { redirect: false }, action) => {
    switch (action.type) {
        case userConstants.REGISTER_REDIRECT:
            return { ...state, redirect: true };
        case userConstants.REGISTER_REDIRECTED:
            return { ...state, redirect: false };
        default:
            return state;
    }
};

const emptyUserInfo = {
    userId: null,
    nickName: '',
    avatarPath: null,
    experience: 0
};

const userInfo = (state = emptyUserInfo, action) => {
    switch (action.type) {
        case userConstants.USER_INFO_RECEIVED:
            return {
                ...state,
                userId: action.userInfo.userId,
                nickName: action.userInfo.nickName,
                avatarPath: action.userInfo.avatarPath,
                experience: action.userInfo.experience
            };

        case userConstants.USER_INFO_CHANGED:
            return {
                ...state,
                nickName: action.userInfo.NickName,
                avatarPath: action.userInfo.AvatarPath
            };

        default:
            return state;
    }
};

export const user = combineReducers({
    login: login,
    register: register,
    userInfo: userInfo
});
