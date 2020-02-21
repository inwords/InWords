import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeTrainingLevelWordPairs } from 'src/actions/trainingActions';
import TrainingSwitcher from 'src/templates/TrainingSwitcher';

function DictionaryTrainingSwitcher({ ...rest }) {
  const history = useHistory();

  const dispatch = useDispatch();

  const onGameEnd = ({ levelId, wordPairs }) => {
    dispatch(
      removeTrainingLevelWordPairs(
        levelId,
        wordPairs.map(wordPair => wordPair.pairId)
      )
    );
  };

  const trainingLevelsMap = useSelector(
    store => store.training.trainingLevelsMap
  );

  const onNextLevel = () => {
    if (
      !trainingLevelsMap[-1] ||
      !trainingLevelsMap[-1].wordTranslations.length
    ) {
      history.push('/dictionary');
    }
  };

  return (
    <TrainingSwitcher
      onGameEnd={onGameEnd}
      onNextLevel={onNextLevel}
      {...rest}
    />
  );
}

export default DictionaryTrainingSwitcher;
