import React from 'react';
import { useParams } from 'react-router-dom';
import { loadValue } from 'src/localStorage';
import CustomizedGame from './CustomizedGame';

function TrainingSwitcher(props) {
  const [trainingSettings, setTrainingSettings] = React.useState();

  const params = useParams();

  React.useEffect(() => {
    const trainingsSettingsLocalData = loadValue('trainingsSettings');

    setTrainingSettings(
      (trainingsSettingsLocalData &&
        trainingsSettingsLocalData[params.trainingId]) ||
        {}
    );
  }, [params.trainingId]);

  if (!trainingSettings) {
    return null;
  }

  switch (+params.trainingId) {
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
