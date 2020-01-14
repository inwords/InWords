import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'src/components/Dialog';
import DialogTitle from 'src/components/DialogTitle';
import DialogContent from 'src/components/DialogContent';
import DialogActions from 'src/components/DialogActions';
import Typography from 'src/components/Typography';
import Slider from 'src/components/Slider';
import Button from 'src/components/Button';

import './TrainingSettingsDialog.css';

function TrainingSettingsDialog({
  open,
  handleClose,
  inputs,
  handleChange,
  handleSubmit,
  handleReset
}) {
  return (
    <Dialog
      aria-labelledby="training-settings-dialog"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="training-settings-dialog">
        Настройки тренировки
      </DialogTitle>
      <DialogContent>
        <form
          id="training-settings-form"
          onSubmit={event => {
            handleSubmit(event);
            handleClose();
          }}
        >
          <Typography component="label" htmlFor="quantity" variant="body2">
            Слов в тренировке
          </Typography>
          <div className="training-setting">
            <Slider
              id="quantity"
              name="quantity"
              min="2"
              max="8"
              value={inputs.quantity}
              onChange={handleChange}
              className="training-setting__slider"
            />
            <span>{inputs.quantity}</span>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            handleReset();
          }}
          variant="text"
        >
          Отменить
        </Button>
        <Button
          type="submit"
          form="training-settings-form"
          variant="text"
          color="primary"
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

TrainingSettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  inputs: PropTypes.shape({
    quantity: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired
};

export default TrainingSettingsDialog;
