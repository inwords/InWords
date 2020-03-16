import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'src/components/core/Dialog';
import DialogTitle from 'src/components/core/DialogTitle';
import DialogContent from 'src/components/core/DialogContent';
import DialogActions from 'src/components/core/DialogActions';
import Grid from 'src/components/core/Grid';
import GridItem from 'src/components/core/GridItem';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import Button from 'src/components/core/Button';
import Avatar from 'src/components/core/Avatar';

import './AvatarEditDialog.scss';

function AvatarEditDialog({
  open,
  handleClose,
  avatar,
  handleChange,
  handleSubmit
}) {
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
          <Grid spacing={1}>
            <GridItem>
              <input
                id="avatar-upload-button"
                type="file"
                accept="image/*"
                name="avatarFile"
                onChange={handleChange}
                className="avatar-edit-dialog-input"
              />
              <label htmlFor="avatar-upload-button">
                <IconButton component="span">
                  <Icon>photo_camera</Icon>
                </IconButton>
              </label>
            </GridItem>
            <GridItem>
              <Avatar src={avatar} alt="Аватар" />
            </GridItem>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          Отменить
        </Button>
        <Button
          type="submit"
          form="avatar-edit-form"
          variant="text"
          color="primary"
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AvatarEditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  avatar: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default AvatarEditDialog;
