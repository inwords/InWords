import * as userConstants from '../constants/userContants';

export const initializeUserInfo = userInfo => ({
    type: userConstants.INITIALIZE_USER_INFO,
    payload: userInfo
});

export const updateUserInfo = userInfo => ({
    type: userConstants.UPDATE_USER_INFO,
    payload: userInfo
});
