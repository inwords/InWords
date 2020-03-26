import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { updateEmail } from 'src/actions/authApiActions';
import useForm from 'src/hooks/useForm';
import EmailEditDialog from './EmailEditDialog';

const initialInputs = { email: '' };

function EmailEditDialogContainer({ open, ...rest }) {
  const dispatch = useDispatch();

  const { inputs, setInputs, handleChange, handleSubmit } = useForm(
    initialInputs,
    async () => {
      try {
        await dispatch(updateEmail(inputs.email));
        dispatch(
          setSnackbar({
            text: 'На новый email было отправлено письмо с подтверждением'
          })
        );
      } catch (error) {
        dispatch(setSnackbar({ text: 'Не удалось изменить email' }));
      }
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
