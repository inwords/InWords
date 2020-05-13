import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadValue } from 'src/localStorage';
import CustomizedTrainingWrapper from 'src/components/routes-common/CustomizedTrainingWrapper';
import AuditionTraining from './AuditionTraining';
import ControlledAuditionTrainingSettingsDialog from './ControlledAuditionTrainingSettingsDialog';

function CustomizedAuditionTraining({ trainingLevel, handleEnd }) {
  const [trainingSettings, setTrainingSettings] = useState({});

  useEffect(() => {
    setTrainingSettings(loadValue('trainingSettings-1') || {});
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
    <CustomizedTrainingWrapper
      title="Аудирование"
      rightToolbarNodes={[
        <ControlledAuditionTrainingSettingsDialog
          key={0}
          trainingSettings={trainingSettings}
          setTrainingSettings={setTrainingSettings}
        />
      ]}
    >
      {Boolean(processedTrainingLevel) && (
        <AuditionTraining
          trainingLevel={processedTrainingLevel}
          handleEnd={handleEnd}
        />
      )}
    </CustomizedTrainingWrapper>
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
