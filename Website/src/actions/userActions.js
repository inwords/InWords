import userConstants from '../constants/userConstants';

const initializeUserInfo = userInfo => ({
    type: userConstants.USER_INFO_INITIALIZATION,
    payload: userInfo
});

const updateUserInfo = userInfo => ({
    type: userConstants.USER_INFO_UPDATE,
    payload: userInfo
});

export default {
    initializeUserInfo,
    updateUserInfo
};
