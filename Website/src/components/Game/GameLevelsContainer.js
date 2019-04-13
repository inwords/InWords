import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gameApiActions from '../../actions/gameApiActions';
import GameLevels from './GameLevels';

function GameLevelsContainer({ gameInfo, pullGameInfo, history, match }) {
    const handleRedirection = levelId => () => {
        history.push(`/games/level/${levelId}`);
    };

    useEffect(() => {
        if (gameInfo.gameId !== parseInt(match.params.id)) {
            pullGameInfo(parseInt(match.params.id));
        }
    }, []);

    return (
        gameInfo.gameId && (
            <GameLevels
                gameInfo={gameInfo}
                handleRedirection={handleRedirection}
            />)
    );
}

GameLevelsContainer.propTypes = {
    gameInfo: PropTypes.shape({
        gameId: PropTypes.number,
    }).isRequired,
    pullGameInfo: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

const mapStateToProps = store => {
    return {
        gameInfo: store.game.gameInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        pullGameInfo: gameId => dispatch(gameApiActions.pullGameInfo(gameId))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(GameLevelsContainer));
