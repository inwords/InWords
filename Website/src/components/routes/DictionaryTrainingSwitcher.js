import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeTrainingLevelWordPairs } from 'src/actions/trainingActions';
import useClientTrainingLevel from 'src/components/routes/common/useClientTrainingLevel';
import TrainingSwitcher from 'src/components/routes/common/TrainingSwitcher';

function DictionaryTrainingSwitcher({ ...rest }) {
  const trainingLevel = useClientTrainingLevel('/dictionary');

  const dispatch = useDispatch();

  const onGameEnd = ({ levelId, wordPairs }) => {
    dispatch(
      removeTrainingLevelWordPairs(
        levelId,
        wordPairs.map(wordPair => wordPair.pairId)
      )
    );
  };

  const history = useHistory();

  const onNextLevel = () => {
    if (!trainingLevel || !trainingLevel.wordTranslations.length) {
      history.push('/dictionary');
    }
  };

  return (
    Boolean(trainingLevel) && (
      <TrainingSwitcher
        onGameEnd={onGameEnd}
        onNextLevel={onNextLevel}
        trainingLevel={trainingLevel}
        {...rest}
      />
    )
  );
}

export default DictionaryTrainingSwitcher;
