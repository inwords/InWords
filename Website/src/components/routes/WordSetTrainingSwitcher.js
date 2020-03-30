import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateWordSetLevelResult } from 'src/actions/wordSetActions';
import useServerTrainingLevel from 'src/components/routes-common/useServerTrainingLevel';
import TrainingSwitcher from 'src/components/routes-common/TrainingSwitcher';

function WordSetTrainingSwitcher(props) {
  const trainingLevel = useServerTrainingLevel();

  const dispatch = useDispatch();

  const levelsListsMap = useSelector(store => store.wordSet.levelsListsMap);

  const history = useHistory();
  const params = useParams();

  const handleResultSuccess = ({ levelResult }) => {
    dispatch(updateWordSetLevelResult(params.wordSetId, levelResult));
  };

  const handleNextLevel = () => {
    const {
      wordSetId: paramWordSetId,
      levelId: paramLevelId,
      trainingId: paramTrainingId
    } = params;
    const levels = levelsListsMap[paramWordSetId];

    if (levels) {
      const currentLevelIndex = levels.findIndex(
        ({ levelId }) => levelId === +paramLevelId
      );

      if (currentLevelIndex !== -1) {
        const nextLevelIndex = currentLevelIndex + 1;
        const nextLevel = levels[nextLevelIndex];

        if (nextLevel) {
          history.push(
            `/training/courses/${paramWordSetId}/${nextLevel.levelId}/${paramTrainingId}`
          );

          return;
        }
      }
    }

    history.push('/training/courses');
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

export default WordSetTrainingSwitcher;
