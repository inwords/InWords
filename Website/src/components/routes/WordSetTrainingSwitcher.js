import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateWordSetLevelResult } from 'src/actions/wordSetActions';
import useServerTrainingLevel from 'src/components/routes-common/useServerTrainingLevel';
import TrainingsConveyor from 'src/components/routes-common/TrainingsConveyor';

function WordSetTrainingSwitcher() {
  const trainingLevel = useServerTrainingLevel();

  const dispatch = useDispatch();

  const levelsListsMap = useSelector(store => store.wordSet.levelsListsMap);

  const history = useHistory();
  const { wordSetId: paramWordSetId, levelId: paramLevelId } = useParams();

  const handleResultSuccess = levelResult => {
    if (levelResult) {
      dispatch(updateWordSetLevelResult(paramWordSetId, levelResult));
    }
  };

  const handleNextLevel = () => {
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
            `/training/courses/${paramWordSetId}/${nextLevel.levelId}/=)`
          );

          return;
        }
      }
    }

    history.push('/training/courses');
  };

  return (
    <TrainingsConveyor
      handleResultSuccess={handleResultSuccess}
      handleNextLevel={handleNextLevel}
      trainingLevel={trainingLevel}
    />
  );
}

export default WordSetTrainingSwitcher;
