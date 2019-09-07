import apiAction from './apiAction';
import { setSnackbar } from './commonActions';
import { grantAccess } from './accessActions';
import { history } from 'App';

export function signIn(userdata) {
  return apiAction({
    endpoint: 'auth/token',
    method: 'POST',
    authorizationRequired: false,
    data: JSON.stringify(userdata),
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(grantAccess(data));
      },
      () => {
        history.push('/wordlist');
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось авторизоваться' }));
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
      (dispatch, data) => {
        dispatch(grantAccess(data));
      },
      () => {
        history.push(`/emailConfirmation/${userdata.email}`);
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось зарегистрироваться' }));
      }
    ]
  });
}

export function confirmEmail(emailClaims) {
  return apiAction({
    endpoint: 'email/confirmCode',
    method: 'POST',
    data: JSON.stringify(emailClaims),
    actionsOnSuccess: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Аккаунт успешно создан' }));
      },
      () => {
        history.push('/wordlist');
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось активировать email' }));
      }
    ]
  });
}