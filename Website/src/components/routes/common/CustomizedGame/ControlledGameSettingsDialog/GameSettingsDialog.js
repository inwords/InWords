import React from 'react';
import PropTypes from 'prop-types';
import { saveValue } from 'src/localStorage';
import useForm from 'src/hooks/useForm';
import Dialog from 'src/components/core/Dialog';
import DialogTitle from 'src/components/core/DialogTitle';
import DialogContent from 'src/components/core/DialogContent';
import DialogActions from 'src/components/core/DialogActions';
import FormGroup from 'src/components/core/FormGroup';
import FormControlLabel from 'src/components/core/FormControlLabel';
import Typography from 'src/components/core/Typography';
import Checkbox from 'src/components/core/Checkbox';
import Button from 'src/components/core/Button';
import Slider from 'src/components/core/Slider';

function GameSettingsDialogContainer({
  open,
  handleClose,
  trainingSettings,
  setTrainingSettings
}) {
  const { inputs, setInputs, handleChange } = useForm({});

  React.useEffect(() => {
    if (open) {
      const {
        quantity = '8',
        voiceOn = false,
        listOn = false,
        cardDimension = '120',
        cardTextSize = '16'
      } = trainingSettings;

      setInputs({ quantity, voiceOn, listOn, cardDimension, cardTextSize });
    }
  }, [trainingSettings, open, setInputs]);

  const handleSubmit = event => {
    event.preventDefault();

    saveValue('trainingsSettings', {
      [0]: {
        ...inputs
      }
    });

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
              Максимум слов в тренировке: {inputs.quantity}
            </Typography>
            <Slider
              name="quantity"
              min="2"
              max="8"
              value={inputs.quantity}
              onChange={handleChange}
            />
          </FormGroup>
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
          <div>
            <FormControlLabel>
              <Checkbox
                name="voiceOn"
                checked={inputs.voiceOn}
                onChange={handleChange}
                edge="start"
              />
              <Typography variant="body2">
                Озвучивать английские слова
              </Typography>
            </FormControlLabel>
          </div>
          <div>
            <FormControlLabel>
              <Checkbox
                name="listOn"
                checked={inputs.listOn}
                onChange={handleChange}
                edge="start"
              />
              <Typography variant="body2">
                Показывать слова перед тренировкой
              </Typography>
            </FormControlLabel>
          </div>
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

GameSettingsDialogContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  trainingSettings: PropTypes.shape({
    quantity: PropTypes.string,
    voiceOn: PropTypes.bool,
    listOn: PropTypes.bool,
    cardDimension: PropTypes.string,
    cardTextSize: PropTypes.string
  }).isRequired,
  setTrainingSettings: PropTypes.func.isRequired
};

export default GameSettingsDialogContainer;
