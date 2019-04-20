import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import FinalScreen from './FinalScreen';

function FinalScreenContainer({ gameLevel, gameInfo, history, ...other }) {

    const handleRedirectionToNextLevel = () => {
        if (!gameInfo.gameId) {
            history.push('/games');
        } else {
            const levelIndex = gameInfo.levelInfos.findIndex(levelInfo =>
                levelInfo.levelId === gameLevel.levelId);

            if (~levelIndex) {
                if (gameInfo.levelInfos[levelIndex + 1]) {
                    history.push(`/game_level/${gameInfo.levelInfos[levelIndex + 1].levelId}`);
                } else {
                    history.push(`/game/${gameInfo.gameId}`);
                }
            }
        }
    };

    return (
        <FinalScreen
            score={gameLevel.lastScore}
            handleRedirectionToNextLevel={handleRedirectionToNextLevel}
            {...other}
        />
    );
}

FinalScreenContainer.propTypes = {
    gameInfo: PropTypes.shape({
        levelInfos: PropTypes.arrayOf(PropTypes.shape({
            levelId: PropTypes.number.isRequired
        })).isRequired
    }).isRequired,
    gameLevel: PropTypes.shape({
        levelId: PropTypes.number,
        lastScore: PropTypes.number
    }).isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = store => {
    return {
        gameLevel: store.game.gameLevel,
        gameInfo: store.game.gameInfo
    };
};

export default connect(
    mapStateToProps
)(withRouter(FinalScreenContainer));
