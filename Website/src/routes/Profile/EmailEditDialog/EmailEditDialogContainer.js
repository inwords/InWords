import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { sendActivationCode } from 'src/actions/accessApiActions';
import useForm from 'src/hooks/useForm';
import EmailEditDialog from './EmailEditDialog';

function EmailEditDialogContainer({ open, ...rest }) {
  const dispatch = useDispatch();

  const { inputs, setInputs, handleChange, handleSubmit } = useForm(
    { email: '' },
    () => {
      dispatch(sendActivationCode(inputs.email));
    }
  );

  React.useEffect(() => {
    if (open) {
      setInputs({ email: '' });
    }
  }, [open, setInputs]);

  return (
    <EmailEditDialog
      open={open}
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      {...rest}
    />
  );
}

EmailEditDialogContainer.propTypes = {
  open: PropTypes.bool
};

export default EmailEditDialogContainer;
