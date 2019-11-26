import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function NicknameEditDialog({
  open,
  handleClose,
  inputs,
  handleChange,
  handleSubmit
}) {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      aria-labelledby="nickname-edit-dialog"
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
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
            label="Новый nickname"
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
        <Button onClick={handleClose}>Отмена</Button>
        <Button type="submit" form="nickname-edit-form" color="primary">
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
