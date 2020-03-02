import {
  beginLoading,
  endLoading,
  setSnackbar
} from 'src/actions/commonActions';
import { denyAccess } from 'src/actions/accessActions';
import { history } from 'src/App';
import apiAction from 'src/actions/apiAction';

const CALL_API = 'CALL_API';

const API_ROOT = 'https://api.inwords.ru';

const apiMiddleware = ({ dispatch, getState }) => next => action => {
  if (action.type !== CALL_API) {
    next(action);
    return;
  }

  const {
    apiVersion = '1.0',
    endpoint = '',
    method = 'GET',
    authorizationRequired = true,
    data = null,
    contentType = null,
    actionsOnSuccess = [],
    actionsOnFailure = []
  } = action.payload;

  const headers = new Headers();

  if (authorizationRequired) {
    const token = getState().access.token;

    if (!token) {
      history.push('/sign-in');
      return;
    }

    headers.append('Authorization', `Bearer ${token}`);
  }

  if (data && contentType) {
    headers.append('Content-Type', contentType);
  }

  dispatch(beginLoading());

  fetch(`${API_ROOT}/v${apiVersion}${endpoint}`, {
    method,
    headers,
    body: data
  })
    .then(response => {
      dispatch(endLoading());

      if (!response.ok) {
        throw new HttpError(response.statusText, response.status);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        return null; // Other content-types are not supported
      }
    })
    .then(data => {
      actionsOnSuccess.forEach(action => {
        action(dispatch, data);
      });
    })
    .catch(error => {
      dispatch(endLoading());

      if (error instanceof HttpError) {
        const statusCode = error.statusCode;

        if (statusCode === 401) {
          dispatch(denyAccess());
          history.push('/sign-in');
        } else {
          actionsOnFailure.forEach(action => {
            action(dispatch, statusCode);
          });
        }
      } else if (error instanceof TypeError) {
        dispatch(
          setSnackbar({
            text: 'Не удалось соединиться с сервером',
            actionText: 'Повторить',
            actionHandler: () => {
              window.setTimeout(() => {
                dispatch(
                  apiAction({
                    ...action.payload
                  })
                );
              }, 100);
            }
          })
        );
      } else {
        dispatch(setSnackbar({ text: 'Неизвестная ошибка' }));
      }
    });
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
