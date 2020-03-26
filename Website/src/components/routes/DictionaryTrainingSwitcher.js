import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeLevelWordPairs } from 'src/actions/trainingActions';
import useClientTrainingLevel from 'src/components/routes/common-hooks/useClientTrainingLevel';
import TrainingSwitcher from 'src/components/routes/common/TrainingSwitcher';

function DictionaryTrainingSwitcher(props) {
  const trainingLevel = useClientTrainingLevel('/dictionary');

  const dispatch = useDispatch();

  const handleResultSuccess = ({ levelId, wordPairs }) => {
    dispatch(
      removeLevelWordPairs(
        levelId,
        wordPairs.map(wordPair => wordPair.pairId)
      )
    );
  };

  const history = useHistory();

  const handleNextLevel = () => {
    if (!trainingLevel || !trainingLevel.wordTranslations.length) {
      history.push('/dictionary');
    }
  };

  return (
    <TrainingSwitcher
      handleResultSuccess={handleResultSuccess}
      handleNextLevel={handleNextLevel}
      trainingLevel={trainingLevel}
      {...props}
    />
  );
}

export default DictionaryTrainingSwitcher;
