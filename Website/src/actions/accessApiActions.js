import apiAction from './apiAction';
import apiGrpcAction from './apiGrpcAction';
import { setSnackbar } from './commonActions';
import { grantAccess } from './accessActions';
import { history } from 'src/App';
import { ProfileClient } from './protobuf-generated/Profile.v2_grpc_web_pb';
import { RegistrationRequest } from './protobuf-generated/Profile.v2_pb';

export function signIn(userdata) {
  const request = new RegistrationRequest();
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
  return apiAction({
    endpoint: '/auth/registration',
    method: 'POST',
    authorizationRequired: false,
    data: JSON.stringify(userdata),
    contentType: 'application/json',
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(grantAccess(data));
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

export function sendActivationCode(email) {
  return apiAction({
    endpoint: '/email/sendActivationCode',
    method: 'POST',
    data: JSON.stringify(email),
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
