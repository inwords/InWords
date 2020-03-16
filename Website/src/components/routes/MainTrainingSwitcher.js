import React from 'react';
import { useDispatch } from 'react-redux';
import { removeLevelWordPairs } from 'src/actions/trainingActions';
import useClientTrainingLevel from 'src/components/routes/common-hooks/useClientTrainingLevel';
import TrainingSwitcher from 'src/components/routes/common/TrainingSwitcher';

function MainTrainingSwitcher(props) {
  const trainingLevel = useClientTrainingLevel('/training');

  const dispatch = useDispatch();

  const onResult = ({ levelId, wordPairs }) => {
    dispatch(
      removeLevelWordPairs(
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
      {...props}
    />
  );
}

export default MainTrainingSwitcher;
