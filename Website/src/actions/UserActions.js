import { userConstants } from '../constants/userConstants';

const redirect = () => ({
    type: userConstants.REDIRECT
});

const redirected = () => ({
    type: userConstants.REDIRECTED
});

const userInfoReceived = userInfo => ({
    type: userConstants.USER_INFO_RECEIVED,
    userInfo: userInfo
});

const userInfoChanged = userInfo => ({
    type: userConstants.USER_INFO_CHANGED,
    userInfo: userInfo
});

export const userActions = {
    redirect,
    redirected,
    userInfoReceived,
    userInfoChanged
};
