import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'src/components/Dialog';
import DialogTitle from 'src/components/DialogTitle';
import DialogContent from 'src/components/DialogContent';
import DialogActions from 'src/components/DialogActions';
import DialogAction from 'src/components/DialogAction';
import Button from 'src/components/Button';

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
        <DialogAction>
          <Button onClick={handleClose}>Отменить</Button>
        </DialogAction>
        <DialogAction>
          <Button type="submit" form="avatar-edit-form" color="primary">
            Сохранить
          </Button>
        </DialogAction>
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
