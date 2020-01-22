import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from 'src/actions/userApiActions';
import useForm from 'src/hooks/useForm';
import NicknameEditDialog from './NicknameEditDialog';

function NicknameEditDialogContainer({ nickname, open, ...rest }) {
  const dispatch = useDispatch();

  const { inputs, setInputs, handleChange, handleSubmit } = useForm(
    { nickname },
    () => {
      dispatch(updateUserInfo(inputs));
    }
  );

  React.useEffect(() => {
    if (open) {
      setInputs({ nickname });
    }
  }, [open, setInputs, nickname]);

  return (
    <NicknameEditDialog
      open={open}
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      {...rest}
    />
  );
}

NicknameEditDialogContainer.propTypes = {
  open: PropTypes.bool,
  nickname: PropTypes.string
};

export default NicknameEditDialogContainer;
