import React from 'react';
import PropTypes from 'prop-types';
import { loadValue, saveValue } from 'src/localStorage';
import useForm from 'src/hooks/useForm';
import TrainingSettingsDialog from './TrainingSettingsDialog';

function TrainingSettingsDialogContainer({ open, ...rest }) {
  const { inputs, setInputs, handleChange } = useForm({});

  React.useEffect(() => {
    if (open) {
      const trainingsSettingsLocalData = loadValue('trainingsSettings');

      const trainingSettings =
        (trainingsSettingsLocalData && trainingsSettingsLocalData[0]) || {};

      const quantity = trainingSettings.quantity || '8';
      const voiceOn =
        trainingSettings.voiceOn !== undefined
          ? trainingSettings.voiceOn
          : false;
      const listOn =
        trainingSettings.listOn !== undefined ? trainingSettings.listOn : true;
      const cardDimension = trainingSettings.cardDimension || 120;
      const cardTextSize = trainingSettings.cardTextSize || 16;

      setInputs({ quantity, voiceOn, listOn, cardDimension, cardTextSize });
    }
  }, [open, setInputs]);

  const handleSubmit = event => {
    saveValue('trainingsSettings', {
      [0]: {
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
