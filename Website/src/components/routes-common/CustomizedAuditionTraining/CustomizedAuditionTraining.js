import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadValue } from 'src/localStorage';
import CustomizedTrainingWrapper from 'src/components/routes-common/CustomizedTrainingWrapper';
import ControlledTrainingSettingsDialog from 'src/components/routes-common/ControlledTrainingSettingsDialog';
import AuditionTraining from './AuditionTraining';
import AuditionTrainingSettingsDialog from './AuditionTrainingSettingsDialog';

function CustomizedAuditionTraining({ trainingLevel, handleEnd }) {
  const [trainingSettings, setTrainingSettings] = useState(null);

  useEffect(() => {
    const { cardDimension = '120', cardTextSize = '1' } =
      loadValue('trainingSettings-1') || {};
    setTrainingSettings({ cardDimension, cardTextSize });
  }, []);

  return (
    trainingSettings && (
      <CustomizedTrainingWrapper
        title="Аудирование"
        rightToolbarNodes={[
          <ControlledTrainingSettingsDialog
            key={0}
            component={AuditionTrainingSettingsDialog}
            trainingSettings={trainingSettings}
            setTrainingSettings={setTrainingSettings}
          />
        ]}
      >
        <AuditionTraining
          trainingLevel={trainingLevel}
          trainingSettings={trainingSettings}
          handleEnd={handleEnd}
        />
      </CustomizedTrainingWrapper>
    )
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
