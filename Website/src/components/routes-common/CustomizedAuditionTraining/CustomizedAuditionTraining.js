import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadValue } from 'src/localStorage';
import Paper from 'src/components/core/Paper';
import Toolbar from 'src/components/core/Toolbar';
import Typography from 'src/components/core/Typography';
import Space from 'src/components/core/Space';
import AuditionTraining from './AuditionTraining';
import ControlledAuditionTrainingSettingsDialog from './ControlledAuditionTrainingSettingsDialog';

function CustomizedAuditionTraining({ trainingLevel, handleEnd }) {
  const [trainingSettings, setTrainingSettings] = useState({});

  useEffect(() => {
    setTrainingSettings(loadValue('trainingSettings.1') || {});
  }, []);

  const [processedTrainingLevel, setProcessedTrainingLevel] = useState();

  useEffect(() => {
    setProcessedTrainingLevel({
      ...trainingLevel,
      cardSettings: {
        cardDimension: +trainingSettings.cardDimension || 120,
        cardTextSize: +trainingSettings.cardTextSize || 16
      }
    });
  }, [trainingLevel, trainingSettings]);

  return (
    <Fragment>
      <Paper>
        <Toolbar variant="dense">
          <Typography variant="h6">Аудирование</Typography>
          <Space />
          <ControlledAuditionTrainingSettingsDialog
            trainingSettings={trainingSettings}
            setTrainingSettings={setTrainingSettings}
          />
        </Toolbar>
      </Paper>
      {Boolean(processedTrainingLevel) && (
        <AuditionTraining
          trainingLevel={processedTrainingLevel}
          handleEnd={handleEnd}
        />
      )}
    </Fragment>
  );
}

CustomizedAuditionTraining.propTypes = {
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

export default CustomizedAuditionTraining;
