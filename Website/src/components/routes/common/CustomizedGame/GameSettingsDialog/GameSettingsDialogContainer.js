import React from 'react';
import PropTypes from 'prop-types';
import { saveValue } from 'src/localStorage';
import useForm from 'src/hooks/useForm';
import GameSettingsDialog from './GameSettingsDialog';

function GameSettingsDialogContainer({
  trainingSettings,
  setTrainingSettings,
  open,
  ...rest
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
    <GameSettingsDialog
      open={open}
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      {...rest}
    />
  );
}

GameSettingsDialogContainer.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
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
