import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { updateUserInfo as updateUserInfoLocal } from 'src/actions/profileActions';
import { updateUserInfo } from 'src/actions/profileApiActions';
import useForm from 'src/components/core/useForm';
import Dialog from 'src/components/core/Dialog';
import DialogTitle from 'src/components/core/DialogTitle';
import DialogContent from 'src/components/core/DialogContent';
import DialogActions from 'src/components/core/DialogActions';
import FormGroup from 'src/components/core/FormGroup';
import TextField from 'src/components/core/TextField';
import Button from 'src/components/core/Button';

function NicknameEditDialog({ open, handleClose, nickname }) {
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
    <Dialog
      aria-labelledby="nickname-edit-dialog"
      open={open}
      onClose={handleClose}
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
          <FormGroup>
            <TextField
              id="nickname"
              placeholder="Новый никнейм"
              name="nickname"
              value={inputs.nickname}
              onChange={handleChange}
              required
              fullWidth
            />
          </FormGroup>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          Отменить
        </Button>
        <Button
          type="submit"
          form="nickname-edit-form"
          variant="text"
          color="primary"
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

NicknameEditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  nickname: PropTypes.string
};

export default NicknameEditDialog;
