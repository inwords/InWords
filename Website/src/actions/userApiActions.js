import apiAction from './apiAction';
import commonActions from './commonActions';
import userActions from './userActions';
import history from '../history';

function receiveUserInfo(userId) {
    return apiAction({
        endpoint: `users/${userId}`,
        actionsOnSuccess: [
            (dispatch, data) => dispatch(userActions.initializeUserInfo(data))
        ],
        actionsOnFailure: [
            dispatch => dispatch(commonActions.setSnackbarMessage('Не удалось загрузить профиль'))
        ]
    });
}

function updateUserInfo(userInfo) {
    return apiAction({
        endpoint: 'users',
        method: 'PUT',
        data: JSON.stringify(userInfo),
        actionsOnSuccess: [
            (dispatch) => dispatch(userActions.updateUserInfo(userInfo)),
            () => history.push('/profile')
        ],
        actionsOnFailure: [
            dispatch => dispatch(commonActions.setSnackbarMessage('Не удалось сохранить профиль'))
        ]
    });
}

export default {
    receiveUserInfo,
    updateUserInfo
};
