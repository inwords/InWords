import { combineReducers } from 'redux';
import { userConstants } from '../constants/userConstants';

const redirect = (state = false, action) => {
    switch (action.type) {
        case userConstants.REDIRECT:
            return true;
        case userConstants.REDIRECTED:
            return false;
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
    redirect: redirect,
    userInfo: userInfo
});
