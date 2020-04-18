import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { updateEmail } from 'src/actions/profileApiActions';
import useForm from 'src/components/core/useForm';
import Dialog from 'src/components/core/Dialog';
import DialogTitle from 'src/components/core/DialogTitle';
import DialogContent from 'src/components/core/DialogContent';
import DialogContentText from 'src/components/core/DialogContentText';
import DialogActions from 'src/components/core/DialogActions';
import FormGroup from 'src/components/core/FormGroup';
import TextField from 'src/components/core/TextField';
import Button from 'src/components/core/Button';

const initialInputs = { email: '' };

function EmailEditDialog({ open, handleClose }) {
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

  useEffect(() => {
    if (open) {
      setInputs(initialInputs);
    }
  }, [open, setInputs]);

  return (
    <Dialog
      aria-labelledby="email-edit-dialog"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="email-edit-dialog">Изменение email</DialogTitle>
      <DialogContent>
        <DialogContentText>
          На новый email будет отправлено письмо с подтверждением.
        </DialogContentText>
        <form
          id="email-edit-form"
          onSubmit={event => {
            handleSubmit(event);
            handleClose();
          }}
        >
          <FormGroup>
            <TextField
              id="email"
              placeholder="Новый email"
              type="email"
              autoComplete="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              required
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
          form="email-edit-form"
          variant="text"
          color="primary"
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EmailEditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default EmailEditDialog;
