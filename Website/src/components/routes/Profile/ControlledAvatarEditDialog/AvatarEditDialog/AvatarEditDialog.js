import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { updateUserInfo } from 'src/actions/profileActions';
import { uploadUserAvatar } from 'src/actions/profileApiActions';
import Dialog from 'src/components/core/Dialog';
import DialogTitle from 'src/components/core/DialogTitle';
import DialogContent from 'src/components/core/DialogContent';
import DialogActions from 'src/components/core/DialogActions';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import Button from 'src/components/core/Button';
import Avatar from 'src/components/core/Avatar';

import './AvatarEditDialog.scss';

const initialInputs = {
  avatarFile: null
};

function AvatarEditDialog({ open, handleClose }) {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState(initialInputs);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (open) {
      setInputs(initialInputs);
      setAvatar(null);
    }
  }, [open, setInputs]);

  const handleChange = event => {
    const target = event.target;
    const name = target.name;

    const file = target.files && target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        setAvatar(event.target.result);
      };
      reader.readAsDataURL(file);

      setInputs({
        ...inputs,
        [name]: file
      });
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', inputs.avatarFile);
      const data = await dispatch(uploadUserAvatar(formData));
      dispatch(updateUserInfo(data));
    } catch (error) {
      dispatch(setSnackbar({ text: 'Не удалось загрузить аватар' }));
    }
  };

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
          className="avatar-edit-dialog-form"
        >
          <div>
            <input
              data-testid="avatar-upload"
              id="avatar-upload"
              type="file"
              accept="image/*"
              name="avatarFile"
              onChange={handleChange}
              className="avatar-edit-dialog-input"
            />
            <label htmlFor="avatar-upload">
              <IconButton component="span" role="button" tabIndex="0">
                <Icon>photo_camera</Icon>
              </IconButton>
            </label>
          </div>
          {avatar && (
            <div>
              <Avatar
                src={avatar}
                alt="Avatar-preview"
                className="avatar-edit-dialog-preview"
              >
                A
              </Avatar>
            </div>
          )}
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
  handleClose: PropTypes.func.isRequired
};

export default AvatarEditDialog;
