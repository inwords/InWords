import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { uploadUserAvatar } from 'src/actions/userApiActions';
import AvatarEditDialog from './AvatarEditDialog';

const initialInputs = {
  avatarFile: null
};

function AvatarEditDialogContainer({ open, ...rest }) {
  const dispatch = useDispatch();

  const [inputs, setInputs] = React.useState();
  const [avatar, setAvatar] = React.useState();

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

  const handleSubmit = event => {
    const formData = new FormData();
    formData.set('file', inputs.avatarFile);
    dispatch(uploadUserAvatar(formData));

    event.preventDefault();
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
