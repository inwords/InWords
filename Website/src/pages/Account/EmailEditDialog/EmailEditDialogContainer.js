import React from 'react';
import { useDispatch } from 'react-redux';
import { sendActivationCode } from 'actions/accessApiActions';
import useForm from 'hooks/useForm';
import EmailEditDialog from './EmailEditDialog';

function EmailEditDialogContainer({ ...rest }) {
  const dispatch = useDispatch();

  const { inputs, setInputs, handleChange, handleSubmit } = useForm(
    { email: '' },
    () => {
      dispatch(sendActivationCode(inputs.email));
    }
  );

  const handleReset = () => {
    setInputs({ email: '' });
  };

  return (
    <EmailEditDialog
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleReset={handleReset}
      {...rest}
    />
  );
}

export default EmailEditDialogContainer;
