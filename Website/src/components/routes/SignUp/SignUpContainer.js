import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { grantAccess } from 'src/actions/authActions';
import { signUp, signInOAuth2 } from 'src/actions/authApiActions';
import { saveState } from 'src/localStorage';
import useForm from 'src/hooks/useForm';
import SignUp from './SignUp';

const handleSignUpSuccess = (data, dispatch, history) => {
  dispatch(grantAccess(data));
  saveState({
    auth: {
      token: data.token,
      userId: data.userId
    }
  });
  history.push('/profile');
};

function SignUpContainer() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { inputs, handleChange, handleSubmit } = useForm(
    {
      email: '',
      password: ''
    },
    async () => {
      try {
        const data = await dispatch(signUp(inputs));
        handleSignUpSuccess(data, dispatch, history);
        dispatch(
          setSnackbar({
            text: 'На указанный email было отправлено письмо с подтверждением'
          })
        );
      } catch (error) {
        dispatch(setSnackbar({ text: 'Не удалось зарегистрироваться' }));
      }
    }
  );

  const handleSubmitAnonymously = async () => {
    try {
      const data = await dispatch(signUp(inputs, true));
      handleSignUpSuccess(data, dispatch, history);
    } catch (error) {
      dispatch(setSnackbar({ text: 'Не удалось войти гостем' }));
    }
  };

  const handleSignInOAuth2 = React.useCallback(
    async response => {
      const data = await dispatch(signInOAuth2(response.uc.id_token));
      handleSignUpSuccess(data, dispatch, history);
    },
    [dispatch, history]
  );

  return (
    <SignUp
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleSubmitAnonymously={handleSubmitAnonymously}
      handleSignInOAuth2={handleSignInOAuth2}
    />
  );
}

export default SignUpContainer;
