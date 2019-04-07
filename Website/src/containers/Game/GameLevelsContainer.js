import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gameActions from '../../actions/gameActions';
import gameApiActions from '../../actions/gameApiActions';
import GameLevels from '../../components/Game/GameLevels';

function GameLevelsContainer({ gameInfo, pullGameInfo, clearGameLevel, history, match }) {
    const handleRedirection = levelId => () => {
        clearGameLevel();
        history.push(`/games_catalog/level/${levelId}`);
    };

    useEffect(() => {
        pullGameInfo(parseInt(match.params.id));
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
    clearGameLevel: PropTypes.func.isRequired,
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
        pullGameInfo: gameId => dispatch(gameApiActions.pullGameInfo(gameId)),
        clearGameLevel: () => dispatch(gameActions.clearGameLevel())
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(GameLevelsContainer));
