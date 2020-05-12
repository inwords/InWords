import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadValue } from 'src/localStorage';
import Paper from 'src/components/core/Paper';
import Toolbar from 'src/components/core/Toolbar';
import Typography from 'src/components/core/Typography';
import Space from 'src/components/core/Space';
import Game from './Game';
import ControlledGameSettingsDialog from './ControlledGameSettingsDialog';

function CustomizedGame({ trainingLevel, handleEnd }) {
  const [trainingSettings, setTrainingSettings] = useState({});

  useEffect(() => {
    setTrainingSettings(loadValue('trainingSettings-0') || {});
  }, []);

  const [processedTrainingLevel, setProcessedTrainingLevel] = useState();

  useEffect(() => {
    setProcessedTrainingLevel({
      ...trainingLevel,
      cardSettings: {
        cardDimension: +trainingSettings.cardDimension || 120,
        cardTextSize: +trainingSettings.cardTextSize || 16
      },
      voiceOn: trainingSettings.voiceOn || false
    });
  }, [trainingLevel, trainingSettings]);

  return (
    <Fragment>
      <Paper>
        <Toolbar variant="dense">
          <Typography variant="h6">Закрытые карточки</Typography>
          <Space />
          <ControlledGameSettingsDialog
            trainingSettings={trainingSettings}
            setTrainingSettings={setTrainingSettings}
          />
        </Toolbar>
      </Paper>
      {Boolean(processedTrainingLevel) && (
        <Game trainingLevel={processedTrainingLevel} handleEnd={handleEnd} />
      )}
    </Fragment>
  );
}

CustomizedGame.propTypes = {
  trainingLevel: PropTypes.shape({
    levelId: PropTypes.number.isRequired,
    wordTranslations: PropTypes.arrayOf(
      PropTypes.shape({
        serverId: PropTypes.number.isRequired,
        wordForeign: PropTypes.string.isRequired,
        wordNative: PropTypes.string.isRequired,
        onSpeech: PropTypes.func
      }).isRequired
    ).isRequired
  }).isRequired,
  handleEnd: PropTypes.func
};

export default CustomizedGame;
