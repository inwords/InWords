import React from 'react';
import useServerTrainingLevel from 'src/components/routes/common-hooks/useServerTrainingLevel';
import TrainingTypes from 'src/components/routes/common/TrainingTypes';

function CoursesTrainingTypes() {
  const trainingLevel = useServerTrainingLevel();

  return <TrainingTypes trainingLevel={trainingLevel} />;
}

export default CoursesTrainingTypes;
