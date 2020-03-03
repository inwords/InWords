import React from 'react';
import PropTypes from 'prop-types';
import { loadValue, saveValue } from 'src/localStorage';
import useForm from 'src/hooks/useForm';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import GameSettingsDialog from './GameSettingsDialog';

function GameSettingsDialogContainer({ open, ...rest }) {
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
      const cardDimension = trainingSettings.cardDimension || '120';
      const cardTextSize = trainingSettings.cardTextSize || '16';

      setInputs({ quantity, voiceOn, listOn, cardDimension, cardTextSize });
    }
  }, [open, setInputs]);

  const dispatch = useDispatch();

  const handleSubmit = event => {
    saveValue('trainingsSettings', {
      [0]: {
        ...inputs
      }
    });

    dispatch(
      setSnackbar({
        text: 'Новые настройки будут применены в следующей игре'
      })
    );

    event.preventDefault();
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
  open: PropTypes.bool
};

export default GameSettingsDialogContainer;
