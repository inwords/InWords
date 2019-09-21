import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TrainingResult from './TrainingResult';

function TrainingResultContainer({ history, match, ...rest }) {
  const { levelsInfo } = useSelector(store => store.games.gameInfo);

  const handleRedirectionToLevels = () => {
    history.push(`/trainings/${match.params.categoryId}/${match.params.trainingId}`);
  };

  const handleRedirectionToNextLevel = () => {
    const parsedLevelId = parseInt(match.params.levelId);
    const levelIndex = levelsInfo.findIndex(
      levelInfo => levelInfo.levelId === parsedLevelId
    );

    if (levelIndex !== -1) {
      const nextLevelIndex = levelIndex + 1;
      if (levelsInfo[nextLevelIndex]) {
        history.push(
          `/trainings/${match.params.categoryId}/${match.params.trainingId}/${levelsInfo[nextLevelIndex].levelId}`
        );
      } else {
        handleRedirectionToLevels();
      }
    } else {
      handleRedirectionToLevels();
    }
  };

  return (
    <TrainingResult
      handleRedirectionToLevels={handleRedirectionToLevels}
      handleRedirectionToNextLevel={handleRedirectionToNextLevel}
      {...rest}
    />
  );
}

TrainingResultContainer.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  score: PropTypes.number,
  handleReplay: PropTypes.func
};

export default withRouter(TrainingResultContainer);
