import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { uploadUserAvatar } from 'src/actions/userApiActions';
import AvatarEditDialog from './AvatarEditDialog';

function AvatarEditDialogContainer({ open, ...rest }) {
  const dispatch = useDispatch();

  const inputRef = React.useRef();

  const handleSubmit = event => {
    const formData = new FormData();
    formData.set('file', inputRef.current.files[0]);
    dispatch(uploadUserAvatar(formData));

    event.preventDefault();
  };

  return (
    <AvatarEditDialog
      open={open}
      ref={inputRef}
      handleSubmit={handleSubmit}
      {...rest}
    />
  );
}

AvatarEditDialogContainer.propTypes = {
  open: PropTypes.bool
  //nickname: PropTypes.string
};

export default AvatarEditDialogContainer;
