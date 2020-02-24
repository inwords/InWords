import apiAction from './apiAction';
import { setSnackbar } from './commonActions';
import * as userActions from './userActions';
import { history } from 'src/App';

export function receiveUserInfoById(userId) {
  return apiAction({
    endpoint: `/users/${userId}`,
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(userActions.initializeUserInfo(data));
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось загрузить профиль' }));
      }
    ]
  });
}

export function receiveUserInfo() {
  return apiAction({
    endpoint: '/users',
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(userActions.initializeUserInfo(data));
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось загрузить профиль' }));
      }
    ]
  });
}

export function updateUserInfo(userInfo) {
  return apiAction({
    endpoint: '/users',
    method: 'PUT',
    data: JSON.stringify(userInfo),
    contentType: 'application/json',
    actionsOnSuccess: [
      dispatch => {
        dispatch(userActions.updateUserInfo(userInfo));
      },
      () => {
        history.push('/profile');
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось сохранить профиль' }));
      }
    ]
  });
}

export function uploadUserAvatar(formData) {
  return apiAction({
    apiVersion: '1.1',
    endpoint: '/profileSettings/uploadAvatar',
    method: 'PUT',
    data: formData,
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(userActions.updateUserInfo(data));
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не загрузить аватар' }));
      }
    ]
  });
}
