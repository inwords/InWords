import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { denyAccess } from 'src/actions/authActions';
import { deleteAccount } from 'src/actions/authApiActions';
import useForm from 'src/hooks/useForm';
import Button from 'src/components/core/Button';
import Dialog from 'src/components/core/Dialog';
import DialogTitle from 'src/components/core/DialogTitle';
import DialogContent from 'src/components/core/DialogContent';
import DialogContentText from 'src/components/core/DialogContentText';
import DialogActions from 'src/components/core/DialogActions';
import FormGroup from 'src/components/core/FormGroup';
import TextField from 'src/components/core/TextField';

const initialInputs = { nickname: '', reason: '' };

function AccountDeleteDialog({ open, handleClose, nickname }) {
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
    <Dialog
      aria-labelledby="account-delete-dialog"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="account-delete-dialog">Удаление аккаунта</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Для подтверждения удаления аккаунта введите Ваш никнейм.
        </DialogContentText>
        <form
          id="account-delete-form"
          onSubmit={event => {
            handleSubmit(event);
            handleClose();
          }}
        >
          <FormGroup>
            <TextField
              id="nickname-confirmation"
              placeholder="Никнейм"
              name="nickname"
              value={inputs.nickname}
              onChange={handleChange}
              required
              fullWidth
            />
          </FormGroup>
          <FormGroup>
            <TextField
              id="reason"
              placeholder="Причина удаления"
              name="reason"
              value={inputs.reason}
              onChange={handleChange}
              multiline
              inputProps={{ rows: 3 }}
              fullWidth
            />
          </FormGroup>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          Отменить
        </Button>
        <Button
          type="submit"
          form="account-delete-form"
          variant="text"
          color="primary"
        >
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AccountDeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  nickname: PropTypes.string
};

export default AccountDeleteDialog;
