import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'src/components/Dialog';
import DialogTitle from 'src/components/DialogTitle';
import DialogContent from 'src/components/DialogContent';
import DialogActions from 'src/components/DialogActions';
import FormGroup from 'src/components/FormGroup';
import Typography from 'src/components/Typography';
import Slider from 'src/components/Slider';
import Checkbox from 'src/components/Checkbox';
import Button from 'src/components/Button';

import './TrainingSettingsDialog.css';

function TrainingSettingsDialog({
  open,
  handleClose,
  inputs,
  handleChange,
  handleSubmit
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
          <FormGroup className="training-setting-col">
            <Typography
              component="label"
              htmlFor="training-words-quantity"
              variant="body2"
            >
              Слов в тренировке
            </Typography>
            <div>
              <Slider
                id="training-words-quantity"
                name="quantity"
                min="2"
                max="8"
                value={inputs.quantity}
                onChange={handleChange}
                className="training-setting-slider"
              />
              <span>{inputs.quantity}</span>
            </div>
          </FormGroup>
          <FormGroup className="training-setting-row">
            <Typography
              component="label"
              htmlFor="training-words-voice"
              variant="body2"
            >
              Озвучивать английские слова
            </Typography>
            <Checkbox
              id="training-words-voice"
              name="voice"
              checked={inputs.voice}
              onChange={handleChange}
              className="training-setting-checkbox"
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
    quantity: PropTypes.string,
    voice: PropTypes.bool
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default TrainingSettingsDialog;
