import apiAction from './apiAction';
import { setSnackbar } from './commonActions';
import * as userActions from './userActions';
import { history } from 'App';

export function receiveUserInfoById(userId) {
  return apiAction({
    endpoint: `users/${userId}`,
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
    endpoint: 'users',
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
    endpoint: 'users',
    method: 'PUT',
    data: JSON.stringify(userInfo),
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
