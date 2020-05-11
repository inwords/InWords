import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useTrainingsConfig from 'src/components/routes-common/useTrainingsConfig';
import useServerTrainingLevel from 'src/components/routes-common/useServerTrainingLevel';
import TrainingsConveyor from 'src/components/routes-common/TrainingsConveyor';

function HistoryTrainingSwitcher() {
  const { selectedTrainingTypes, trainingsSettings } = useTrainingsConfig();

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
      selectedTrainingTypes={selectedTrainingTypes}
      trainingsSettings={trainingsSettings}
      handleNextLevel={handleNextLevel}
      trainingLevel={trainingLevel}
    />
  );
}

export default HistoryTrainingSwitcher;
