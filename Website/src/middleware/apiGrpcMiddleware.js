import {
  beginLoading,
  endLoading,
  setSnackbar
} from 'src/actions/commonActions';
import { denyAccess } from 'src/actions/accessActions';
import { history } from 'src/App';
import apiAction from 'src/actions/apiAction';

const CALL_API_GRPC = 'CALL_API_GRPC';

const API_ROOT = 'https://grpc.inwords.ru';

const apiGrpcMiddleware = ({ dispatch, getState }) => next => action => {
  if (action.type !== CALL_API_GRPC) {
    next(action);
    return;
  }

  const {
    Client,
    request,
    method,
    authorizationRequired = true,
    onSuccess,
    onFailure
  } = action.payload;

  const metadata = {};
  if (authorizationRequired) {
    const token = getState().access.token;

    if (!token) {
      history.push('/sign-in');
      return;
    }

    metadata['Authorization'] = `Bearer ${token}`;
  }

  const client = new Client(API_ROOT);

  dispatch(beginLoading());

  try {
    client[method](request, metadata, (error, response) => {
      dispatch(endLoading());

      if (error) {
        if (!error.metadata) {
          dispatch(
            setSnackbar({
              text: 'Не удалось соединиться с сервером',
              actionText: 'Повторить',
              actionHandler: () => {
                window.setTimeout(() => {
                  dispatch(apiAction(action.payload));
                }, 100);
              }
            })
          );
        } else if (error.code === 401) {
          dispatch(denyAccess());
          history.push('/sign-in');
        } else {
          if (onFailure) {
            onFailure(dispatch, error);
          }
        }
      } else {
        if (onSuccess) {
          onSuccess(dispatch, response);
        }
      }
    });
  } catch (error) {
    dispatch(endLoading());
    dispatch(setSnackbar({ text: 'Неизвестная ошибка' }));
  }
};

export { CALL_API_GRPC };
export default apiGrpcMiddleware;
