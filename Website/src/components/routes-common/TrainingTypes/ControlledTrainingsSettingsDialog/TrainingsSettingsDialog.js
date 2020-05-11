import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadValue, saveValue } from 'src/localStorage';
import useForm from 'src/components/core/useForm';
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

function TrainingsSettingsDialog({ open, handleClose }) {
  const { inputs, setInputs, handleChange } = useForm({});

  useEffect(() => {
    if (open) {
      const { quantity = '8', listOn = false } =
        loadValue('trainingsSettings') || {};

      setInputs({ quantity, listOn });
    }
  }, [open, setInputs]);

  const handleSubmit = event => {
    event.preventDefault();
    saveValue('trainingsSettings', inputs);
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
              Cлов в тренировке: {inputs.quantity}
            </Typography>
            <Slider
              name="quantity"
              min="2"
              max="8"
              value={inputs.quantity}
              onChange={handleChange}
            />
          </FormGroup>
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

TrainingsSettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default TrainingsSettingsDialog;
