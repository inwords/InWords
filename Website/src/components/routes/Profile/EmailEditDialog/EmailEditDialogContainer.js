import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateEmail } from 'src/actions/accessApiActions';
import useForm from 'src/hooks/useForm';
import EmailEditDialog from './EmailEditDialog';

const initialInputs = { email: '' };

function EmailEditDialogContainer({ open, ...rest }) {
  const dispatch = useDispatch();

  const { inputs, setInputs, handleChange, handleSubmit } = useForm(
    initialInputs,
    () => {
      dispatch(updateEmail(inputs.email));
    }
  );

  React.useEffect(() => {
    if (open) {
      setInputs(initialInputs);
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
