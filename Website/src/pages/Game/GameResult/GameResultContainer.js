import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GameResult from './GameResult';

function GameResultContainer({ history, ...rest }) {
    const gameLevel = useSelector(store => store.games.gameLevel);
    const gameInfo = useSelector(store => store.games.gameInfo);

    const handleRedirectionToLevels = () => {
        if (!gameInfo.gameId) {
            history.push('/games');
        } else {
            history.push(`/game/${gameInfo.gameId}`);
        }
    };

    const handleRedirectionToNextLevel = () => {
        if (!gameInfo.gameId) {
            history.push('/games');
        } else {
            const levelIndex = gameInfo.levelsInfo.findIndex(levelInfo =>
                levelInfo.levelId === gameLevel.levelId);

            if (~levelIndex) {
                if (gameInfo.levelsInfo[levelIndex + 1]) {
                    history.push(`/gameLevel/${gameInfo.levelsInfo[levelIndex + 1].levelId}`);
                } else {
                    history.push(`/game/${gameInfo.gameId}`);
                }
            }
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
    score: PropTypes.number,
    handleReplay: PropTypes.func
};

export default withRouter(GameResultContainer);
