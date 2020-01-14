import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'src/components/Dialog';
import DialogTitle from 'src/components/DialogTitle';
import DialogContent from 'src/components/DialogContent';
import DialogContentText from 'src/components/DialogContentText';
import DialogActions from 'src/components/DialogActions';
import DialogAction from 'src/components/DialogAction';
import FormGroup from 'src/components/FormGroup';
import TextField from 'src/components/TextField';
import Button from 'src/components/Button';

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
        <DialogAction>
          <Button onClick={handleClose}>Отменить</Button>
        </DialogAction>
        <DialogAction>
          <Button type="submit" form="email-edit-form" color="primary">
            Сохранить
          </Button>
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
