import React from 'react';
import { useDispatch } from 'react-redux';
import useForm from 'hooks/useForm';
import { signUp as signUpAction } from 'actions/accessApiActions';
import SignUp from './SignUp';

function SignUpContainer() {
  const dispatch = useDispatch();

  const { inputs, handleChange, handleSubmit } = useForm(
    {
      email: '',
      password: ''
    },
    () => {
      dispatch(signUpAction(inputs));
    }
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
