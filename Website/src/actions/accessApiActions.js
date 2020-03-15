import { push } from 'connected-react-router';
import { v4 as uuidv4 } from 'uuid';
import apiGrpcAction from './apiGrpcAction';
import { setSnackbar } from './commonActions';
import { grantAccess, denyAccess } from './accessActions';
import { ProfileClient } from './protobuf-generated/Profile.v2_grpc_web_pb';
import {
  TokenRequest,
  RegistrationRequest,
  EmailChangeRequest,
  DeleteAccountRequest
} from './protobuf-generated/Profile.v2_pb';

export function signIn(userdata) {
  const request = new TokenRequest();
  request.setEmail(userdata.email);
  request.setPassword(userdata.password);

  return apiGrpcAction({
    Client: ProfileClient,
    request,
    method: 'getToken',
    withCredentials: false,
    onSuccess: ({ dispatch, response }) => {
      dispatch(
        grantAccess({
          token: response.getToken(),
          userId: response.getUserid()
        })
      );

      dispatch(push('/training'));
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось авторизоваться' }));
    }
  });
}

export function signUp(userdata, isAnonymous = false) {
  const request = new RegistrationRequest();
  request.setEmail(
    !isAnonymous ? userdata.email : `${uuidv4().slice(0, 7)}@inwords`
  );
  request.setPassword(userdata.password);
  request.setIsanonymous(isAnonymous);

  return apiGrpcAction({
    Client: ProfileClient,
    request,
    method: 'register',
    withCredentials: false,
    onSuccess: ({ dispatch, response }) => {
      dispatch(
        grantAccess({
          token: response.getToken(),
          userId: response.getUserid()
        })
      );

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
}

export function updateEmail(email) {
  const request = new EmailChangeRequest();
  request.setEmail(email);

  return apiGrpcAction({
    Client: ProfileClient,
    request,
    method: 'requestEmailUpdate',
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
}

export function deleteAccount(reason) {
  const request = new DeleteAccountRequest();
  request.setText(reason);

  return apiGrpcAction({
    Client: ProfileClient,
    request,
    method: 'deleteAccount',
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
}
