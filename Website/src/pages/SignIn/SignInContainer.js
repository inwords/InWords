import React from 'react';
import { useDispatch } from 'react-redux';
import useForm from 'hooks/useForm';
import { signIn as signInAction } from 'actions/accessApiActions';
import SignIn from './SignIn';

function SignInContainer() {
  const dispatch = useDispatch();
  const signIn = userdata => dispatch(signInAction(userdata));

  const { inputs, handleChange, handleSubmit } = useForm(
    {
      email: '',
      password: '',
    },
    () => signIn(inputs)
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
