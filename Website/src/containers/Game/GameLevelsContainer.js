import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gameApiActions from '../../actions/gameApiActions';
import GameLevels from '../../components/Game/GameLevels';

function GameLevelsContainer({ gameInfo, pullGameInfo, history, match }) {
    const handleRedirection = levelId => () => {
        history.push(`/games/level/${levelId}`)
    };

    useEffect(() => {
        pullGameInfo(parseInt(match.params.id));
    }, []);

    return (
        gameInfo && (
            <GameLevels
                gameInfo={gameInfo}
                handleRedirection={handleRedirection}
            />)
    );
}

GameLevelsContainer.propTypes = {
    gameInfo: PropTypes.object,
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
