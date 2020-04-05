import apiAction from './apiAction';

export const getUserInfo = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        endpoint: '/users',
        resolve,
        reject
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
        resolve,
        reject
      })
    )
  );

export const updateEmail = email => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '2',
        endpoint: '/profile/updateEmail',
        method: 'POST',
        data: JSON.stringify({ email }),
        resolve,
        reject
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
        contentType: null,
        resolve,
        reject
      })
    )
  );

export const deleteAccount = reason => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '2',
        endpoint: '/profile/delete',
        method: 'DELETE',
        data: JSON.stringify({ text: reason }),
        resolve,
        reject
      })
    )
  );
