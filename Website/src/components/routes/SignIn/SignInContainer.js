import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { grantAccess } from 'src/actions/accessActions';
import { signIn } from 'src/actions/accessApiActions';
import useForm from 'src/hooks/useForm';
import SignIn from './SignIn';

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
        dispatch(grantAccess(data));
        history.push('/training');
      } catch (error) {
        dispatch(setSnackbar({ text: 'Не удалось авторизоваться' }));
      }
    }
  );

  return (
    <SignIn
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default SignInContainer;
