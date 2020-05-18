import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadValue } from 'src/localStorage';
import CustomizedTrainingWrapper from 'src/components/routes-common/CustomizedTrainingWrapper';
import ControlledTrainingSettingsDialog from 'src/components/routes-common/ControlledTrainingSettingsDialog';
import AuditionTraining from './AuditionTraining';
import AuditionTrainingSettingsDialog from './AuditionTrainingSettingsDialog';

function CustomizedAuditionTraining(props) {
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
        <AuditionTraining trainingSettings={trainingSettings} {...props} />
      </CustomizedTrainingWrapper>
    )
  );
}

CustomizedAuditionTraining.propTypes = {
  trainingLevel: PropTypes.object.isRequired,
  handleEnd: PropTypes.func
};

export default CustomizedAuditionTraining;
