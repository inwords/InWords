import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'src/components/core/Dialog';
import DialogTitle from 'src/components/core/DialogTitle';
import DialogContent from 'src/components/core/DialogContent';
import DialogActions from 'src/components/core/DialogActions';
import FormGroup from 'src/components/core/FormGroup';
import TextField from 'src/components/core/TextField';
import Button from 'src/components/core/Button';

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
          <FormGroup>
            <TextField
              id="nickname"
              placeholder="Новый никнейм"
              name="nickname"
              value={inputs.nickname}
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
          form="nickname-edit-form"
          variant="text"
          color="primary"
        >
          Сохранить
        </Button>
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
