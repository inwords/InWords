import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeWordSetLevelPairs } from 'src/actions/wordSetActions';
import useClientTrainingLevel from 'src/components/routes-common/useClientTrainingLevel';
import TrainingSwitcher from 'src/components/routes-common/TrainingSwitcher';

function MainTrainingSwitcher({ redirectionUrl }) {
  const trainingLevel = useClientTrainingLevel(redirectionUrl);

  const dispatch = useDispatch();

  const handleNextLevel = (levelId, wordPairs) => {
    dispatch(
      removeWordSetLevelPairs(
        levelId,
        wordPairs.map(wordPair => wordPair.pairId)
      )
    );
  };

  return (
    <TrainingSwitcher
      handleNextLevel={handleNextLevel}
      trainingLevel={trainingLevel}
    />
  );
}

MainTrainingSwitcher.propTypes = {
  redirectionUrl: PropTypes.string.isRequired
};

export default MainTrainingSwitcher;
