import React from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/core/Button';
import Dialog from 'src/components/core/Dialog';
import DialogTitle from 'src/components/core/DialogTitle';
import DialogContent from 'src/components/core/DialogContent';
import DialogContentText from 'src/components/core/DialogContentText';
import DialogActions from 'src/components/core/DialogActions';
import FormGroup from 'src/components/core/FormGroup';
import TextField from 'src/components/core/TextField';

function AccountDeleteDialog({
  open,
  handleClose,
  inputs,
  handleChange,
  handleSubmit
}) {
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
  inputs: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default AccountDeleteDialog;
