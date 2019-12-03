import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'src/components/Dialog';
import DialogTitle from 'src/components/DialogTitle';
import DialogContent from 'src/components/DialogContent';
import DialogActions from 'src/components/DialogActions';
import DialogAction from 'src/components/DialogAction';
import TextField from '@material-ui/core/TextField';
import Button from 'src/components/Button';

function NicknameEditDialog({
  open,
  handleClose,
  inputs,
  handleChange,
  handleSubmit
}) {
  return (
    <Dialog
      aria-labelledby="nickname-edit-dialog"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="nickname-edit-dialog">Изменение никнейма</DialogTitle>
      <DialogContent>
        <form
          id="nickname-edit-form"
          onSubmit={event => {
            handleSubmit(event);
            handleClose();
          }}
        >
          <TextField
            id="nickname"
            label="Новый никнейм"
            type="nickname"
            autoComplete="nickname"
            name="nickname"
            value={inputs.nickname}
            onChange={handleChange}
            required
            margin="normal"
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <DialogAction>
          <Button onClick={handleClose}>Отменить</Button>
        </DialogAction>
        <DialogAction>
          <Button type="submit" form="nickname-edit-form" primary>
            Сохранить
          </Button>
        </DialogAction>
      </DialogActions>
    </Dialog>
  );
}

NicknameEditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  inputs: PropTypes.shape({
    nickname: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default NicknameEditDialog;
