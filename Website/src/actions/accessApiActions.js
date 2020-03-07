import apiAction from './apiAction';
import apiGrpcAction from './apiGrpcAction';
import { setSnackbar } from './commonActions';
import { grantAccess } from './accessActions';
import { history } from 'src/App';
import { ProfileClient } from './protobuf-generated/Profile.v2_grpc_web_pb';
import {
  TokenRequest,
  RegistrationRequest
} from './protobuf-generated/Profile.v2_pb';

export function signIn(userdata) {
  const request = new TokenRequest();
  request.setEmail(userdata.email);
  request.setPassword(userdata.password);

  return apiGrpcAction({
    Client: ProfileClient,
    request,
    method: 'getToken',
    authorizationRequired: false,
    actionsOnSuccess: [
      (dispatch, response) => {
        dispatch(
          grantAccess({
            token: response.getToken(),
            userId: response.getUserid()
          })
        );
      },
      () => {
        history.push('/training');
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось авторизоваться' }));
      }
    ]
  });
}

export function signUp(userdata) {
  const request = new RegistrationRequest();
  request.setEmail(userdata.email);
  request.setPassword(userdata.password);

  return apiGrpcAction({
    Client: ProfileClient,
    request,
    method: 'register',
    authorizationRequired: false,
    actionsOnSuccess: [
      (dispatch, response) => {
        dispatch(
          grantAccess({
            token: response.getToken(),
            userId: response.getUserid()
          })
        );
      },
      dispatch => {
        dispatch(
          setSnackbar({
            text: 'На указанный email было отправленое письмо с подтверждением'
          })
        );
      },
      () => {
        history.push('/profile');
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось зарегистрироваться' }));
      }
    ]
  });
}

export function updateEmail(email) {
  return apiAction({
    apiVersion: '2',
    endpoint: '/profile/updateEmail',
    method: 'POST',
    data: JSON.stringify({ email }),
    contentType: 'application/json',
    actionsOnSuccess: [
      dispatch => {
        dispatch(
          setSnackbar({
            text: 'На новый email было отправленое письмо с подтверждением'
          })
        );
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось изменить email' }));
      }
    ]
  });
}
