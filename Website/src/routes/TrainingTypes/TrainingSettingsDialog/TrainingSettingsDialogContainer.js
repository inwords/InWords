import React from 'react';
import PropTypes from 'prop-types';
import withLocalStorageData from 'src/HOCs/withLocalStorageData';
import { saveValue } from 'src/localStorage';
import useForm from 'src/hooks/useForm';
import TrainingSettingsDialog from './TrainingSettingsDialog';

function TrainingSettingsDialogContainer({ typeId, open, localData, ...rest }) {
  const initialInputs = { quantity: localData['training-words-quantity'] || 8 };

  const { inputs, setInputs, handleChange } = useForm(initialInputs);

  const handleSubmit = event => {
    saveValue('training-words-quantity', inputs.quantity);
    event.preventDefault();
  };

  const handleReset = () => {
    setInputs(initialInputs);
  };

  return (
    <TrainingSettingsDialog
      open={open}
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleReset={handleReset}
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
  'training-words-quantity'
]);
