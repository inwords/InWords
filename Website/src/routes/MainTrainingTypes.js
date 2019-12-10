import React from 'react';
import useTrainingWordPairs from 'src/hooks/useTrainingWordPairs';
import TrainingTypes from './TrainingTypes';

function MainTrainingTypes(props) {
  useTrainingWordPairs();

  return <TrainingTypes {...props} />;
}

export default MainTrainingTypes;
