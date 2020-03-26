import { v4 as uuidv4 } from 'uuid';
import apiAction from './apiAction';

export const signIn = userData => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '2',
        endpoint: '/auth/basic',
        method: 'POST',
        withCredentials: false,
        data: JSON.stringify(userData),
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );

export const signUp = (userData, isAnonymous = false) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '2',
        endpoint: '/auth/register',
        method: 'POST',
        withCredentials: false,
        data: JSON.stringify({
          email: !isAnonymous
            ? userData.email
            : `${uuidv4().slice(0, 7)}@inwords`,
          password: userData.password,
          isAnonymous
        }),
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );

export const signInOAuth2 = token => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '2',
        endpoint: '/auth/OAuth2',
        method: 'POST',
        withCredentials: false,
        data: JSON.stringify({ serviceName: 'google', token }),
        onSuccess: resolve,
        onFailure: reject
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
        onSuccess: resolve,
        onFailure: reject
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
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );
