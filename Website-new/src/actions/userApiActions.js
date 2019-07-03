import history from '../history';
import apiAction from './apiAction';
import commonActions from './commonActions';
import accessActions from './accessActions';

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
            dispatch => dispatch(commonActions.setSnackbar({
                message: 'Не удалось авторизоваться'
            }))
        ]
    });
}

function signUp(userdata) {
    return apiAction({
        endpoint: 'auth/registration',
        method: 'POST',
        data: JSON.stringify(userdata),
        actionsOnSuccess: [
            dispatch => dispatch(commonActions.setSnackbar({
                message: 'Аккаунт успешно создан'
            })),
            () => history.push('/signIn')
        ],
        actionsOnFailure: [
            dispatch => dispatch(commonActions.setSnackbar({
                message: 'Не удалось зарегистрироваться'
            }))
        ]
    });
}

export default {
    signIn,
    signUp
};
