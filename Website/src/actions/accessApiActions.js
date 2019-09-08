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
        dispatch(setSnackbar({ text: 'Email успешно подтвержден' }));
      },
      () => {
        history.push('/profile');
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось подтвердить email' }));
      }
    ]
  });
}

export function sendActivationCode(email) {
  return apiAction({
    endpoint: 'email/sendActivationCode',
    method: 'POST',
    data: JSON.stringify(email),
    actionsOnSuccess: [
      () => {
        history.push(`/emailConfirmation/${email}`);
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось изменить email' }));
      }
    ]
  });
}