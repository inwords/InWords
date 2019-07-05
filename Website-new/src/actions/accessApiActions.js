import apiAction from './apiAction';
import commonActions from './commonActions';
import accessActions from './accessActions';
import history from '../history';

function signIn(userdata) {
    return apiAction({
        endpoint: 'auth/token',
        method: 'POST',
        data: JSON.stringify(userdata),
        actionsOnSuccess: [
            (dispatch, data) => dispatch(accessActions.grantAccess(data)),
            () => history.push('/wordlist')
        ],
        actionsOnFailure: [
            dispatch => dispatch(commonActions.setSnackbarMessage('Не удалось авторизоваться'))
        ]
    });
}

function signUp(userdata) {
    return apiAction({
        endpoint: 'auth/registration',
        method: 'POST',
        data: JSON.stringify(userdata),
        actionsOnSuccess: [
            dispatch => dispatch(commonActions.setSnackbarMessage('Аккаунт успешно создан')),
            () => history.push('/signIn')
        ],
        actionsOnFailure: [
            dispatch => dispatch(commonActions.setSnackbarMessage('Не удалось зарегистрироваться'))
        ]
    });
}

export default {
    signIn,
    signUp
};
