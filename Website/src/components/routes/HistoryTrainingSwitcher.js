import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useServerTrainingLevel from 'src/components/routes/common-hooks/useServerTrainingLevel';
import TrainingSwitcher from 'src/components/routes/common/TrainingSwitcher';

function HistoryTrainingSwitcher(props) {
  const trainingLevel = useServerTrainingLevel();

  const trainingHistory = useSelector(store => store.training.history);

  const history = useHistory();
  const params = useParams();

  const handleNextLevel = () => {
    const currentLevelIndex = trainingHistory.recentTrainings.findIndex(
      ({ levelId }) => levelId === +params.levelId
    );

    if (currentLevelIndex !== -1) {
      const nextLevelIndex = currentLevelIndex + 1;
      const nextLevel = trainingHistory.recentTrainings[nextLevelIndex];

      if (nextLevel) {
        history.push(
          `/training/history/${nextLevel.levelId}/${params.trainingId}`
        );
        return;
      }
    }

    history.push('/training/history');
  };

  return (
    <TrainingSwitcher
      handleResultSuccess={null}
      handleNextLevel={handleNextLevel}
      trainingLevel={trainingLevel}
      {...props}
    />
  );
}

export default HistoryTrainingSwitcher;
