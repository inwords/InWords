import { push } from 'connected-react-router';
import { v4 as uuidv4 } from 'uuid';
import apiAction from './apiAction';
import { setSnackbar } from './commonActions';
import { grantAccess, denyAccess } from './accessActions';

export const signIn = userData =>
  apiAction({
    apiVersion: '2',
    endpoint: '/profile/token',
    method: 'POST',
    withCredentials: false,
    data: JSON.stringify(userData),
    onSuccess: ({ dispatch, data }) => {
      dispatch(grantAccess(data));
      dispatch(push('/training'));
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось авторизоваться' }));
    }
  });

export const signUp = (userData, isAnonymous = false) =>
  apiAction({
    apiVersion: '2',
    endpoint: '/profile/register',
    method: 'POST',
    withCredentials: false,
    data: JSON.stringify({
      email: !isAnonymous ? userData.email : `${uuidv4().slice(0, 7)}@inwords`,
      password: userData.password,
      isAnonymous
    }),
    onSuccess: ({ dispatch, data }) => {
      dispatch(grantAccess(data));

      if (!isAnonymous) {
        dispatch(
          setSnackbar({
            text: 'На указанный email было отправлено письмо с подтверждением'
          })
        );
      }

      dispatch(push('/profile'));
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось зарегистрироваться' }));
    }
  });

export const updateEmail = email =>
  apiAction({
    apiVersion: '2',
    endpoint: '/profile/updateEmail',
    method: 'POST',
    data: JSON.stringify({ email }),
    onSuccess: ({ dispatch }) => {
      dispatch(
        setSnackbar({
          text: 'На новый email было отправлено письмо с подтверждением'
        })
      );
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось изменить email' }));
    }
  });

export const deleteAccount = reason =>
  apiAction({
    apiVersion: '2',
    endpoint: '/profile/delete',
    method: 'DELETE',
    data: JSON.stringify({ text: reason }),
    onSuccess: ({ dispatch }) => {
      dispatch(denyAccess());
      dispatch(push('/sign-in'));
      dispatch(
        setSnackbar({
          text: 'Аккаунт был успешно удален'
        })
      );
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось удалить аккаунт' }));
    }
  });
