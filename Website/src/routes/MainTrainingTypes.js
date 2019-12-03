import React from 'react';
import useTrainingWordPairs from 'src/hooks/useTrainingWordPairs';
import TrainingTypes from './TrainingTypes';

function MainTrainingTypes() {
  const trainingWordPairs = useTrainingWordPairs();

  return <TrainingTypes endpoint="/0" />;
}

export default MainTrainingTypes;
