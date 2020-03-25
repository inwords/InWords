import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { denyAccess } from 'src/actions/accessActions';
import { deleteAccount } from 'src/actions/accessApiActions';
import useForm from 'src/hooks/useForm';
import AccountDeleteDialog from './AccountDeleteDialog';

const initialInputs = { nickname: '', reason: '' };

function AccountDeleteDialogContainer({ nickname, open, ...rest }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const { inputs, setInputs, handleChange, handleSubmit } = useForm(
    initialInputs,
    async () => {
      if (
        inputs.nickname.trim().toLowerCase() !== nickname.trim().toLowerCase()
      ) {
        dispatch(
          setSnackbar({
            text: 'Никнейм не совпал. Удаление аккаунта отменено.'
          })
        );
      } else {
        try {
          await dispatch(deleteAccount(inputs.reason));
          dispatch(denyAccess());
          history.push('/sign-in');
          dispatch(
            setSnackbar({
              text: 'Аккаунт был успешно удален'
            })
          );
        } catch (error) {
          dispatch(setSnackbar({ text: 'Не удалось удалить аккаунт' }));
        }
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
