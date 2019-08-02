import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useForm from 'hooks/useForm';
import { signUp as signUpAction } from 'actions/accessApiActions';
import SignUp from './SignUp';

function SignUpContainer() {
  const dispatch = useDispatch();
  const signUp = useCallback(userdata => dispatch(signUpAction(userdata)), [
    dispatch,
  ]);

  const { inputs, handleChange, handleSubmit } = useForm(
    {
      email: '',
      password: '',
    },
    () => signUp(inputs)
  );

  return (
    <SignUp
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default SignUpContainer;
