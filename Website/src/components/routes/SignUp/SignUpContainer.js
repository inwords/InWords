import React from 'react';
import { useDispatch } from 'react-redux';
import useForm from 'src/hooks/useForm';
import { signUp } from 'src/actions/accessApiActions';
import SignUp from './SignUp';

function SignUpContainer() {
  const dispatch = useDispatch();

  const { inputs, handleChange, handleSubmit } = useForm(
    {
      email: '',
      password: ''
    },
    () => {
      dispatch(signUp(inputs));
    }
  );

  const handleSubmitAnonymously = () => {
    dispatch(signUp(inputs, true));
  };

  return (
    <SignUp
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleSubmitAnonymously={handleSubmitAnonymously}
    />
  );
}

export default SignUpContainer;
