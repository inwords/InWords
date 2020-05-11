import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loadValue } from 'src/localStorage';
import useServerTrainingLevel from 'src/components/routes-common/useServerTrainingLevel';
import TrainingsConveyor from 'src/components/routes-common/TrainingsConveyor';

function HistoryTrainingSwitcher() {
  const [trainingsSettings, setTrainingsSettings] = useState({});

  useEffect(() => {
    const { quantity = '8', listOn = false } =
      loadValue('trainingsSettings') || {};

    setTrainingsSettings({ quantity, listOn });
  }, []);

  const trainingLevel = useServerTrainingLevel();

  const trainingHistory = useSelector(store => store.trainingHistory);

  const history = useHistory();

  const { levelId: paramLevelId, trainingId: paramTrainingId } = useParams();

  const handleNextLevel = () => {
    const currentLevelIndex = trainingHistory.findIndex(
      ({ levelId }) => levelId === +paramLevelId
    );

    if (currentLevelIndex !== -1) {
      const nextLevelIndex = currentLevelIndex + 1;
      const nextLevel = trainingHistory[nextLevelIndex];

      if (nextLevel) {
        history.push(
          `/training/history/${nextLevel.levelId}/${paramTrainingId}`
        );
        return;
      }
    }

    history.push('/training/history');
  };

  return (
    <TrainingsConveyor
      trainingsSettings={trainingsSettings}
      handleNextLevel={handleNextLevel}
      trainingLevel={trainingLevel}
    />
  );
}

export default HistoryTrainingSwitcher;
