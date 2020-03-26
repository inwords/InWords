import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { updateUserInfo as updateUserInfoLocal } from 'src/actions/profileActions';
import { updateUserInfo } from 'src/actions/profileApiActions';
import useForm from 'src/hooks/useForm';
import NicknameEditDialog from './NicknameEditDialog';

function NicknameEditDialogContainer({ nickname, open, ...rest }) {
  const dispatch = useDispatch();

  const { inputs, setInputs, handleChange, handleSubmit } = useForm(
    { nickname },
    async () => {
      try {
        await dispatch(updateUserInfo(inputs));
        dispatch(updateUserInfoLocal(inputs));
      } catch (error) {
        dispatch(setSnackbar({ text: 'Не удалось сохранить никнейм' }));
      }
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
