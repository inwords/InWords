import { push } from 'connected-react-router';
import {
  beginLoading,
  endLoading,
  setSnackbar
} from 'src/actions/commonActions';
import { denyAccess } from 'src/actions/accessActions';

const CALL_API = 'CALL_API';

const API_ROOT = 'https://api.inwords.ru';

const apiMiddleware = ({ dispatch, getState }) => next => async action => {
  if (action.type !== CALL_API) {
    next(action);
    return;
  }

  const {
    apiVersion = '1.0',
    endpoint = '',
    method = 'GET',
    withCredentials = true,
    data = null,
    contentType = 'application/json',
    onSuccess,
    onFailure
  } = action.payload;

  const headers = new Headers();

  if (withCredentials) {
    const token = getState().access.token;

    if (!token) {
      dispatch(push('/sign-in'));
      return;
    }

    headers.append('Authorization', `Bearer ${token}`);
  }

  if (data && contentType) {
    headers.append('Content-Type', contentType);
  }

  dispatch(beginLoading());

  try {
    const response = await fetch(`${API_ROOT}/v${apiVersion}${endpoint}`, {
      method,
      headers,
      body: data
    });

    dispatch(endLoading());

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status);
    }

    let responseData = null;

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    }

    if (onSuccess) {
      onSuccess({ dispatch, data: responseData });
    }
  } catch (error) {
    dispatch(endLoading());

    if (error instanceof HttpError) {
      const statusCode = error.statusCode;

      if (statusCode === 401) {
        dispatch(denyAccess());
        dispatch(push('/sign-in'));
      } else {
        if (onFailure) {
          onFailure({ dispatch, statusCode });
        }
      }
    } else if (error instanceof TypeError) {
      dispatch(
        setSnackbar({
          text: 'Не удалось соединиться с сервером'
        })
      );
    } else {
      dispatch(setSnackbar({ text: 'Неизвестная ошибка' }));
    }
  }
};

class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export { CALL_API };

export default apiMiddleware;
