import userConstants from '../constants/userConstants';

const redirect = () => ({
    type: userConstants.REDIRECT
});

const redirected = () => ({
    type: userConstants.REDIRECTED
});

const initializeUserInfo = userInfo => ({
    type: userConstants.USER_INFO_INITIALIZATION,
    userInfo: userInfo
});

const updateUserInfo = userInfo => ({
    type: userConstants.USER_INFO_UPDATE,
    userInfo: userInfo
});

const userActions = {
    redirect,
    redirected,
    initializeUserInfo,
    updateUserInfo
};

export default userActions;
