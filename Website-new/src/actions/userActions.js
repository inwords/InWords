import userConstants from '../constants/userContants';

const initializeUserInfo = userInfo => ({
    type: userConstants.INITIALIZE_USER_INFO,
    payload: userInfo
});

const updateUserInfo = userInfo => ({
    type: userConstants.UPDATE_USER_INFO,
    payload: userInfo
});

export default {
    initializeUserInfo,
    updateUserInfo
};
