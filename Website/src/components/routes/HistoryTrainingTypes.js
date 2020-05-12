import React from 'react';
import useServerTrainingLevel from 'src/components/routes-common/useServerTrainingLevel';
import TrainingTypes from 'src/components/routes-common/TrainingTypes';

function HistoryTrainingTypes() {
  const trainingLevel = useServerTrainingLevel();

  return <TrainingTypes trainingLevel={trainingLevel || { levelId: -1 }} />;
}

export default HistoryTrainingTypes;
