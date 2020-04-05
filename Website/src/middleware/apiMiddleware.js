import history from 'src/history';
import { beginLoading, endLoading } from 'src/actions/commonActions';
import { denyAccess } from 'src/actions/authActions';

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
    resolve,
    reject
  } = action.payload;

  const headers = new Headers();

  if (withCredentials) {
    const token = getState().auth.token;

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

  try {
    const response = await fetch(`${API_ROOT}/v${apiVersion}${endpoint}`, {
      method,
      headers,
      body: data
    });

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status);
    }

    let responseData = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    }
    if (resolve) {
      resolve(responseData);
    }
  } catch (error) {
    if (error instanceof HttpError) {
      const statusCode = error.statusCode;
      if (statusCode === 401) {
        dispatch(denyAccess());
        history.push('/sign-in');
      } else if (reject) {
        reject(statusCode);
      }
    } else {
      reject(null);
    }
  } finally {
    dispatch(endLoading());
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
