import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTrainingLevelWordPairs } from 'src/actions/trainingActions';
import useClientTrainingLevel from 'src/routes/useClientTrainingLevel';
import TrainingSwitcher from 'src/routes/TrainingSwitcher';

function MainTrainingSwitcher({ ...rest }) {
  const trainingLevel = useClientTrainingLevel('/training');

  const dispatch = useDispatch();

  const onGameEnd = ({ levelId, wordPairs }) => {
    dispatch(
      removeTrainingLevelWordPairs(
        levelId,
        wordPairs.map(wordPair => wordPair.pairId)
      )
    );
  };

  const onNextLevel = () => {
    if (!trainingLevel || !trainingLevel.wordTranslations.length) {
      history.push('/training/main/0');
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

export default MainTrainingSwitcher;
