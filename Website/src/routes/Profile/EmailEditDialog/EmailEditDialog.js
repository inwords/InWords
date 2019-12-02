import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'src/components/Dialog';
import DialogTitle from 'src/components/DialogTitle';
import DialogContent from 'src/components/DialogContent';
import DialogContentText from 'src/components/DialogContentText';
import DialogActions from 'src/components/DialogActions';
import DialogAction from 'src/components/DialogAction';
import Button from 'src/components/Button';
import TextField from '@material-ui/core/TextField';

function EmailEditDialog({
  open,
  handleClose,
  inputs,
  handleChange,
  handleSubmit
}) {
  return (
    <Dialog
      aria-labelledby="email-edit-dialog"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="email-edit-dialog">Изменение email</DialogTitle>
      <DialogContent>
        <DialogContentText>
          На новый email придет письмо с подтверждением.
        </DialogContentText>
        <form
          id="email-edit-form"
          onSubmit={event => {
            handleSubmit(event);
            handleClose();
          }}
        >
          <TextField
            id="email"
            label="Новый email"
            type="email"
            autoComplete="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
            margin="normal"
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <DialogAction>
          <Button type="submit" form="email-edit-form" primary>
            Сохранить
          </Button>
        </DialogAction>
        <DialogAction>
          <Button onClick={handleClose}>Отмена</Button>
        </DialogAction>
      </DialogActions>
    </Dialog>
  );
}

EmailEditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  inputs: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default EmailEditDialog;
