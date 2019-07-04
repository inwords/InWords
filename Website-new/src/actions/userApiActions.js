import history from '../history';
import apiAction from './apiAction';
import commonActions from './commonActions';
import userActions from './userActions';

function receiveUserInfo(userId) {
    return apiAction({
        endpoint: `users/${userId}`,
        actionsOnSuccess: [
            (dispatch, data) => dispatch(userActions.initializeUserInfo(data))
        ],
        actionsOnFailure: [
            dispatch => dispatch(commonActions.setSnackbar({
                message: 'Не удалось загрузить профиль'
            }))
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
            dispatch => dispatch(commonActions.setSnackbar({
                message: 'Не удалось сохранить профиль'
            }))
        ]
    });
}

export default {
    receiveUserInfo,
    updateUserInfo
};
