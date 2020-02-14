import React from 'react';
import PropTypes from 'prop-types';
import { loadValue, saveValue } from 'src/localStorage';
import useForm from 'src/hooks/useForm';
import TrainingSettingsDialog from './TrainingSettingsDialog';

function TrainingSettingsDialogContainer({ typeId, open, ...rest }) {
  const { inputs, setInputs, handleChange } = useForm({});

  React.useEffect(() => {
    if (open) {
      const trainingsSettingsLocalData = loadValue('trainingsSettings');

      const trainingSettings =
        (trainingsSettingsLocalData && trainingsSettingsLocalData[typeId]) ||
        {};

      const quantity = trainingSettings.quantity || '8';
      const voice = trainingSettings.voice || false;
      const cardDimension = trainingSettings.cardDimension || 120;
      const cardTextSize = trainingSettings.cardTextSize || 16;

      setInputs({ quantity, voice, cardDimension, cardTextSize });
    }
  }, [open, typeId, setInputs]);

  const handleSubmit = event => {
    saveValue('trainingsSettings', {
      [typeId]: {
        ...inputs
      }
    });

    event.preventDefault();
  };

  return (
    <TrainingSettingsDialog
      open={open}
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      {...rest}
    />
  );
}

TrainingSettingsDialogContainer.propTypes = {
  open: PropTypes.bool
};

export default TrainingSettingsDialogContainer;
