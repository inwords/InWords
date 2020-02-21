import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import TrainingTypes from 'src/templates/TrainingTypes';

function DictionaryTrainings() {
  const trainingLevelsMap = useSelector(
    store => store.training.trainingLevelsMap
  );

  return (
    <TrainingTypes trainingLevel={trainingLevelsMap[-1] || { levelId: -1 }} />
  );
}

DictionaryTrainings.propTypes = {
  level: PropTypes.number
};

export default DictionaryTrainings;
