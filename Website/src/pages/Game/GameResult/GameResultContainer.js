import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GameResult from './GameResult';

function GameResultContainer({ history, match, ...rest }) {
  const { levelsInfo } = useSelector(store => store.games.gameInfo);

  const handleRedirectionToLevels = () => {
    const parsedGameId = parseInt(match.params.gameId);
    history.push(`/games/${parsedGameId}`);
  };

  const handleRedirectionToNextLevel = () => {
    const parsedLevelId = parseInt(match.params.levelId);
    const levelIndex = levelsInfo.findIndex(
      levelInfo => levelInfo.levelId === parsedLevelId
    );

    if (levelIndex !== -1) {
      if (levelsInfo[levelIndex + 1]) {
        const parsedGameId = parseInt(match.params.gameId);
        history.push(
          `/games/${parsedGameId}/${levelsInfo[levelIndex + 1].levelId}`
        );
      } else {
        handleRedirectionToLevels();
      }
    } else {
      handleRedirectionToLevels();
    }
  };

  return (
    <GameResult
      handleRedirectionToLevels={handleRedirectionToLevels}
      handleRedirectionToNextLevel={handleRedirectionToNextLevel}
      {...rest}
    />
  );
}

GameResultContainer.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  score: PropTypes.number,
  handleReplay: PropTypes.func
};

export default withRouter(GameResultContainer);
