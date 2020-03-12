import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { deleteAccount } from 'src/actions/accessApiActions';
import useForm from 'src/hooks/useForm';
import AccountDeleteDialog from './AccountDeleteDialog';

const initialInputs = { nickname: '', reason: '' };

function AccountDeleteDialogContainer({ nickname, open, ...rest }) {
  const dispatch = useDispatch();

  const { inputs, setInputs, handleChange, handleSubmit } = useForm(
    initialInputs,
    () => {
      if (
        inputs.nickname.trim().toLowerCase() !== nickname.trim().toLowerCase()
      ) {
        dispatch(
          setSnackbar({
            text: 'Никнейм не совпал. Удаление аккаунта отменено.'
          })
        );
      } else {
        dispatch(deleteAccount(inputs));
      }
    }
  );

  React.useEffect(() => {
    if (open) {
      setInputs(initialInputs);
    }
  }, [open, setInputs, nickname]);

  return (
    <AccountDeleteDialog
      open={open}
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      {...rest}
    />
  );
}

AccountDeleteDialogContainer.propTypes = {
  open: PropTypes.bool,
  nickname: PropTypes.string
};

export default AccountDeleteDialogContainer;
