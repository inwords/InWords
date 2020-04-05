import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadValue } from 'src/localStorage';
import CustomizedGame from './CustomizedGame';

function TrainingSwitcher(props) {
  const [trainingSettings, setTrainingSettings] = useState();

  const { trainingId: paramTrainingId } = useParams();

  useEffect(() => {
    const trainingsSettingsLocalData = loadValue('trainingsSettings');

    setTrainingSettings(
      (trainingsSettingsLocalData &&
        trainingsSettingsLocalData[paramTrainingId]) ||
        {}
    );
  }, [paramTrainingId]);

  if (!trainingSettings) {
    return null;
  }

  switch (+paramTrainingId) {
    case 0:
      return (
        <CustomizedGame
          trainingSettings={trainingSettings}
          setTrainingSettings={setTrainingSettings}
          {...props}
        />
      );
    default:
      return null;
  }
}

export default TrainingSwitcher;
