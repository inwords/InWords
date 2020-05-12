import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { saveValue } from 'src/localStorage';
import useForm from 'src/components/core/useForm';
import Dialog from 'src/components/core/Dialog';
import DialogTitle from 'src/components/core/DialogTitle';
import DialogContent from 'src/components/core/DialogContent';
import DialogActions from 'src/components/core/DialogActions';
import FormGroup from 'src/components/core/FormGroup';
import Typography from 'src/components/core/Typography';
import Button from 'src/components/core/Button';
import Slider from 'src/components/core/Slider';

function AuditionTrainingSettingsDialog({
  open,
  handleClose,
  trainingSettings,
  setTrainingSettings
}) {
  const { inputs, setInputs, handleChange } = useForm({});

  useEffect(() => {
    if (open) {
      const { cardDimension = '120', cardTextSize = '16' } = trainingSettings;

      setInputs({ cardDimension, cardTextSize });
    }
  }, [trainingSettings, open, setInputs]);

  const handleSubmit = event => {
    event.preventDefault();

    saveValue('trainingSettings-1', inputs);
    setTrainingSettings(inputs);
  };

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
          <FormGroup>
            <Typography component="p" variant="body2" gutterBottom>
              Размер карточки: {inputs.cardDimension}px
            </Typography>
            <Slider
              name="cardDimension"
              min="80"
              max="140"
              step="5"
              value={inputs.cardDimension}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Typography component="p" variant="body2" gutterBottom>
              Размер текста на карточке: {inputs.cardTextSize}px
            </Typography>
            <Slider
              name="cardTextSize"
              min="12"
              max="24"
              step="1"
              value={inputs.cardTextSize}
              onChange={handleChange}
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

AuditionTrainingSettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  trainingSettings: PropTypes.shape({
    cardDimension: PropTypes.string,
    cardTextSize: PropTypes.string
  }).isRequired,
  setTrainingSettings: PropTypes.func.isRequired
};

export default AuditionTrainingSettingsDialog;
