import {
  beginLoading,
  endLoading,
  setSnackbarMessage
} from 'actions/commonActions';
import { denyAccess } from 'actions/accessActions';
import { history } from 'App';

export const CALL_API = 'CALL_API';

const API_ROOT = 'https://api.inwords.ru';

class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

const apiMiddleware = ({ dispatch, getState }) => next => async action => {
  next(action);

  if (action.type !== CALL_API) return;

  const {
    apiVersion,
    endpoint,
    method,
    authorizationRequired,
    data,
    actionsOnSuccess,
    actionsOnFailure
  } = action.payload;

  const headers = new Headers();

  if (authorizationRequired) {
    const token = getState().access.token;

    if (!token) {
      history.push('/signIn');
      return;
    }

    headers.append('Authorization', `Bearer ${token}`);
  }

  if (data) {
    headers.append('Content-Type', 'application/json');
  }

  dispatch(beginLoading());

  try {
    const response = await fetch(`${API_ROOT}/${apiVersion}/${endpoint}`, {
      method,
      headers,
      body: data
    });

    dispatch(endLoading());

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status);
    }

    const contentType = response.headers.get('content-type');

    let json;
    if (contentType && contentType.includes('application/json')) {
      json = await response.json();
    } else {
      json = null; // other content-types are not supported
    }

    actionsOnSuccess.forEach(action => {
      action(dispatch, json);
    });
  } catch (error) {
    if (error instanceof HttpError) {
      const statusCode = error.statusCode;

      if (statusCode === 401) {
        dispatch(denyAccess());
        history.push('/signIn');
      } else {
        actionsOnFailure.forEach(action => {
          action(dispatch, statusCode);
        });
      }
    } else if (error instanceof TypeError) {
      dispatch(setSnackbarMessage('Не удалось соединиться с сервером'));
    } else {
      dispatch(setSnackbarMessage('Неизвестная ошибка'));
    }
  }
};

export default apiMiddleware;
