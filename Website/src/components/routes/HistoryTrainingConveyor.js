import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useTrainingsConfig from 'src/components/routes-common/useTrainingsConfig';
import useServerTrainingLevel from 'src/components/routes-common/useServerTrainingLevel';
import TrainingsConveyor from 'src/components/routes-common/TrainingsConveyor';

function HistoryTrainingConveyor() {
  const { selectedTrainingTypes, trainingsSettings } = useTrainingsConfig();

  const trainingLevel = useServerTrainingLevel();

  const wordSetHistory = useSelector(store => store.wordSet.history);

  const history = useHistory();

  const { levelId: paramLevelId } = useParams();

  const handleNextLevel = () => {
    const currentLevelIndex = wordSetHistory.findIndex(
      ({ levelId }) => levelId === +paramLevelId
    );

    if (currentLevelIndex !== -1) {
      const nextLevelIndex = currentLevelIndex + 1;
      const nextLevel = wordSetHistory[nextLevelIndex];

      if (nextLevel) {
        history.push(`/history/${nextLevel.levelId}/=)`);
        return;
      }
    }

    history.push('/history');
  };

  return (
    selectedTrainingTypes &&
    trainingsSettings && (
      <TrainingsConveyor
        selectedTrainingTypes={selectedTrainingTypes}
        trainingsSettings={trainingsSettings}
        handleNextLevel={handleNextLevel}
        trainingLevel={trainingLevel}
      />
    )
  );
}

export default HistoryTrainingConveyor;
