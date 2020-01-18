import React from 'react';
import PropTypes from 'prop-types';
import withLocalStorageData from 'src/HOCs/withLocalStorageData';
import { saveValue } from 'src/localStorage';
import useForm from 'src/hooks/useForm';
import TrainingSettingsDialog from './TrainingSettingsDialog';

function TrainingSettingsDialogContainer({ typeId, open, localData, ...rest }) {
  const { inputs, setInputs, handleChange } = useForm();

  React.useEffect(() => {
    const trainingSettings =
      (localData.trainingsSettings && localData.trainingsSettings[typeId]) ||
      {};

    const quantity = trainingSettings.quantity || '8';
    const voice = trainingSettings.voice || false;

    setInputs({ quantity, voice });
  }, [localData.trainingsSettings, typeId, setInputs]);

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
  open: PropTypes.bool,
  localData: PropTypes.shape({
    quantity: PropTypes.string
  }).isRequired
};

export default withLocalStorageData(TrainingSettingsDialogContainer, [
  'trainingsSettings'
]);
