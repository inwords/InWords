import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'src/components/Dialog';
import DialogTitle from 'src/components/DialogTitle';
import DialogContent from 'src/components/DialogContent';
import DialogActions from 'src/components/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from '@emotion/styled-base';
import ButtonBase from 'src/components/ButtonBase';

const AvatarEditDialog = React.forwardRef(function AvatarEditDialog(
  { open, handleClose, handleSubmit },
  inputRef
) {
  return (
    <Dialog
      aria-labelledby="avatar-edit-dialog"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="avatar-edit-dialog">Изменение аватара</DialogTitle>
      <DialogContent>
        <form
          id="avatar-edit-form"
          method="PUT"
          encType="multipart/form-data"
          onSubmit={event => {
            handleSubmit(event);
            handleClose();
          }}
        >
          <input ref={inputRef} type="file" accept="image/*" name="avatar" />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button type="submit" form="avatar-edit-form" color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
});

AvatarEditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default AvatarEditDialog;
