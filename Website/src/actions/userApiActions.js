import { push } from 'connected-react-router';
import apiAction from './apiAction';
import { setSnackbar } from './commonActions';
import {
  initializeUserInfo,
  updateUserInfo as updateUserInfoAction
} from './userActions';

export function receiveUserInfoById(userId) {
  return apiAction({
    endpoint: `/users/${userId}`,
    onSuccess: ({ dispatch, data }) => {
      dispatch(initializeUserInfo(data));
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось загрузить профиль' }));
    }
  });
}

export function receiveUserInfo() {
  return apiAction({
    endpoint: '/users',
    onSuccess: ({ dispatch, data }) => {
      dispatch(initializeUserInfo(data));
    },
    onFailure: ({ dispatch }) => {
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
    onSuccess: ({ dispatch }) => {
      dispatch(updateUserInfoAction(userInfo));
      dispatch(push('/profile'));
    },
    onFailure: ({ dispatch }) => {
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
    onSuccess: ({ dispatch, data }) => {
      dispatch(updateUserInfoAction(data));
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не загрузить аватар' }));
    }
  });
}
