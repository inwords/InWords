import apiAction from './apiAction';
import { setSnackbar } from './commonActions';
import * as userActions from './userActions';
import { history } from 'src/App';

export function receiveUserInfoById(userId) {
  return apiAction({
    endpoint: `/users/${userId}`,
    onSuccess: (dispatch, data) => {
      dispatch(userActions.initializeUserInfo(data));
    },
    onFailure: dispatch => {
      dispatch(setSnackbar({ text: 'Не удалось загрузить профиль' }));
    }
  });
}

export function receiveUserInfo() {
  return apiAction({
    endpoint: '/users',
    onSuccess: (dispatch, data) => {
      dispatch(userActions.initializeUserInfo(data));
    },
    onFailure: dispatch => {
      dispatch(setSnackbar({ text: 'Не удалось загрузить профиль' }));
    }
  });
}

export function updateUserInfo(userInfo) {
  return apiAction({
    endpoint: '/users',
    method: 'PUT',
    data: JSON.stringify(userInfo),
    contentType: 'application/json',
    onSuccess: dispatch => {
      dispatch(userActions.updateUserInfo(userInfo));

      history.push('/profile');
    },
    onFailure: dispatch => {
      dispatch(setSnackbar({ text: 'Не удалось сохранить профиль' }));
    }
  });
}

export function uploadUserAvatar(formData) {
  return apiAction({
    apiVersion: '1.1',
    endpoint: '/profileSettings/uploadAvatar',
    method: 'PUT',
    data: formData,
    onSuccess: (dispatch, data) => {
      dispatch(userActions.updateUserInfo(data));
    },
    onFailure: dispatch => {
      dispatch(setSnackbar({ text: 'Не загрузить аватар' }));
    }
  });
}
