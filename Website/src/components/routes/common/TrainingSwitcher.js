import React from 'react';
import PropTypes from 'prop-types';
import { loadValue } from 'src/localStorage';
import CustomizedGame from './CustomizedGame';

function TrainingSwitcher({ trainingId, ...rest }) {
  const [trainingSettings, setTrainingSettings] = React.useState();

  React.useEffect(() => {
    const trainingsSettingsLocalData = loadValue('trainingsSettings');

    const trainingSettings =
      (trainingsSettingsLocalData && trainingsSettingsLocalData[trainingId]) ||
      {};

    setTrainingSettings(trainingSettings);
  }, [trainingId]);

  if (!trainingSettings) {
    return null;
  }

  switch (trainingId) {
    case 0:
      return <CustomizedGame trainingSettings={trainingSettings} {...rest} />;
    default:
      return null;
  }
}

TrainingSwitcher.propTypes = {
  trainingId: PropTypes.number.isRequired
};

export default TrainingSwitcher;
