import apiAction from './apiAction';
import * as commonActions from './commonActions';
import * as accessActions from './accessActions';
import { history } from 'App';

export function signIn(userdata) {
  return apiAction({
    endpoint: 'auth/token',
    method: 'POST',
    authorizationRequired: false,
    data: JSON.stringify(userdata),
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(accessActions.grantAccess(data));
      },
      () => {
        history.push('/wordlist');
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(commonActions.setSnackbarMessage('Не удалось авторизоваться'));
      }
    ]
  });
}

export function signUp(userdata) {
  return apiAction({
    endpoint: 'auth/registration',
    method: 'POST',
    authorizationRequired: false,
    data: JSON.stringify(userdata),
    actionsOnSuccess: [
      dispatch => {
        dispatch(commonActions.setSnackbarMessage('Аккаунт успешно создан'));
      },
      () => {
        history.push('/signIn');
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(
          commonActions.setSnackbarMessage('Не удалось зарегистрироваться')
        );
      }
    ]
  });
}
