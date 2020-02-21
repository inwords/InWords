import React from 'react';
import TrainingSwitcher from 'src/templates/TrainingSwitcher';

function HistoryTrainingSwitcher({ ...rest }) {
  const onGameEnd = () => {};

  return (
    <TrainingSwitcher onGameEnd={onGameEnd} onNextLevel={null} {...rest} />
  );
}

export default HistoryTrainingSwitcher;
