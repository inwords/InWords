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
        resolve,
        reject
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
        resolve,
        reject
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
        resolve,
        reject
      })
    )
  );
