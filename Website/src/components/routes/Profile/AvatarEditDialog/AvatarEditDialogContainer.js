import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { updateUserInfo } from 'src/actions/userActions';
import { uploadUserAvatar } from 'src/actions/userApiActions';
import AvatarEditDialog from './AvatarEditDialog';

const initialInputs = {
  avatarFile: null
};

function AvatarEditDialogContainer({ open, ...rest }) {
  const dispatch = useDispatch();

  const [inputs, setInputs] = React.useState(initialInputs);
  const [avatar, setAvatar] = React.useState(null);

  React.useEffect(() => {
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
    <AvatarEditDialog
      open={open}
      avatar={avatar}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      {...rest}
    />
  );
}

AvatarEditDialogContainer.propTypes = {
  open: PropTypes.bool
};

export default AvatarEditDialogContainer;
