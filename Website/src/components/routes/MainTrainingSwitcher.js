import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTrainingLevelWordPairs } from 'src/actions/trainingActions';
import useClientTrainingLevel from 'src/components/routes/common-hooks/useClientTrainingLevel';
import TrainingSwitcher from 'src/components/routes/common/TrainingSwitcher';

function MainTrainingSwitcher({ ...rest }) {
  const trainingLevel = useClientTrainingLevel('/training');

  const dispatch = useDispatch();

  const onResult = ({ levelId, wordPairs }) => {
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
    <TrainingSwitcher
      onResult={onResult}
      onNextLevel={onNextLevel}
      trainingLevel={trainingLevel}
      {...rest}
    />
  );
}

export default MainTrainingSwitcher;
