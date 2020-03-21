import apiAction from './apiAction';

export const receiveUserInfo = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        endpoint: '/users',
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );

export const updateUserInfo = userInfo => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        endpoint: '/users',
        method: 'PUT',
        data: JSON.stringify(userInfo),
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );

export const uploadUserAvatar = formData => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '1.1',
        endpoint: '/profileSettings/uploadAvatar',
        method: 'PUT',
        data: formData,
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );
