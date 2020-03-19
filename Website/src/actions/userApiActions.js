import apiAction from './apiAction';
import { setSnackbar } from './commonActions';
import {
  initializeUserInfo,
  updateUserInfo as updateUserInfoAction
} from './userActions';

export const receiveUserInfo = () =>
  apiAction({
    endpoint: '/users',
    onSuccess: ({ dispatch, data }) => {
      dispatch(initializeUserInfo(data));
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось загрузить профиль' }));
    }
  });

export const updateUserInfo = userInfo =>
  apiAction({
    endpoint: '/users',
    method: 'PUT',
    data: JSON.stringify(userInfo),
    onSuccess: ({ dispatch }) => {
      dispatch(updateUserInfoAction(userInfo));
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось сохранить профиль' }));
    }
  });

export const uploadUserAvatar = formData =>
  apiAction({
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
