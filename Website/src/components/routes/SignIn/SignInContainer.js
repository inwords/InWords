import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { grantAccess } from 'src/actions/authActions';
import { signIn, signInOAuth2 } from 'src/actions/authApiActions';
import { saveState } from 'src/localStorage';
import useForm from 'src/hooks/useForm';
import SignIn from './SignIn';

const handleSignInSuccess = (data, dispatch, history) => {
  dispatch(grantAccess(data));
  saveState({
    auth: {
      token: data.token,
      userId: data.userId
    }
  });
  history.push('/training');
};

function SignInContainer() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { inputs, handleChange, handleSubmit } = useForm(
    {
      email: '',
      password: ''
    },
    async () => {
      try {
        const data = await dispatch(signIn(inputs));
        handleSignInSuccess(data, dispatch, history);
      } catch (error) {
        dispatch(setSnackbar({ text: 'Не удалось авторизоваться' }));
      }
    }
  );

  const handleSignInOAuth2 = React.useCallback(
    async response => {
      const data = await dispatch(signInOAuth2(response.uc.id_token));
      dispatch(grantAccess(data));
      handleSignInSuccess(data, dispatch, history);
    },
    [dispatch, history]
  );

  return (
    <SignIn
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleSignInOAuth2={handleSignInOAuth2}
    />
  );
}

export default SignInContainer;
