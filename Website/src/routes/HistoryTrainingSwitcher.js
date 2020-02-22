import React from 'react';
import TrainingSwitcher from 'src/routes/TrainingSwitcher';
import useServerTrainingLevel from 'src/routes/useServerTrainingLevel';

function HistoryTrainingSwitcher({ ...rest }) {
  const trainingLevel = useServerTrainingLevel();

  const onGameEnd = () => {};

  return (
    Boolean(trainingLevel) && (
      <TrainingSwitcher
        onGameEnd={onGameEnd}
        onNextLevel={null}
        trainingLevel={trainingLevel}
        {...rest}
      />
    )
  );
}

export default HistoryTrainingSwitcher;
