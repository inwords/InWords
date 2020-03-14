import { push } from 'connected-react-router';
import {
  beginLoading,
  endLoading,
  setSnackbar
} from 'src/actions/commonActions';
import { denyAccess } from 'src/actions/accessActions';

const CALL_API_GRPC = 'CALL_API_GRPC';

const API_ROOT = 'https://grpc.inwords.ru';

const statusCodes = {
  OK: 0,
  CANCELLED: 1,
  UNKNOWN: 2,
  INVALID_ARGUMENT: 3,
  DEADLINE_EXCEEDED: 4,
  NOT_FOUND: 5,
  ALREADY_EXISTS: 6,
  PERMISSION_DENIED: 7,
  RESOURCE_EXHAUSTED: 8,
  FAILED_PRECONDITION: 9,
  ABORTED: 10,
  OUT_OF_RANGE: 11,
  UNIMPLEMENTED: 12,
  INTERNAL: 13,
  UNAVAILABLE: 14,
  DATA_LOSS: 15,
  UNAUTHENTICATED: 16
};

const apiGrpcMiddleware = ({ dispatch, getState }) => next => action => {
  if (action.type !== CALL_API_GRPC) {
    next(action);
    return;
  }

  const {
    Client,
    request,
    method,
    withCredentials = true,
    onSuccess,
    onFailure
  } = action.payload;

  const metadata = {};
  if (withCredentials) {
    const token = getState().access.token;

    if (!token) {
      dispatch(push('/sign-in'));
      return;
    }

    metadata['Authorization'] = `Bearer ${token}`;
  }

  const client = new Client(API_ROOT);

  dispatch(beginLoading());

  try {
    let recievedResponse = null;

    const call = client[method](request, metadata, (error, response) => {
      dispatch(endLoading());

      if (error) {
        switch (error.code) {
          case statusCodes.UNKNOWN:
            dispatch(
              setSnackbar({
                text: 'Не удалось соединиться с сервером'
              })
            );
            break;
          case statusCodes.UNAUTHENTICATED:
            dispatch(push('/sign-in'));
            dispatch(denyAccess());
            break;
          default:
        }
      } else {
        recievedResponse = response;
      }
    });

    call.on('status', status => {
      if (status.code === statusCodes.OK && onSuccess) {
        onSuccess({ dispatch, response: recievedResponse });
      } else if (onFailure) {
        onFailure({ dispatch, status, statusCodes });
      }
    });
  } catch (_) {
    dispatch(endLoading());
    dispatch(setSnackbar({ text: 'Внутренняя ошибка приложения' }));
  }
};

export { CALL_API_GRPC };

export default apiGrpcMiddleware;
