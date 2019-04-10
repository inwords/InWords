import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gameActions from '../../actions/gameActions';
import gameApiActions from '../../actions/gameApiActions';
import SandboxGames from '../../components/Game/SandboxGames';

function SandboxGamesContainer({ gamesInfo, pullGamesInfo, clearGameInfo, deleteGamePack, userId, history }) {
    useEffect(() => {
        pullGamesInfo();
    }, []);

    const handleRedirection = gameId => () => {
        clearGameInfo();
        history.push(`/games_catalog/game/${gameId}`);
    };

    const handleGamePackDeletion = gameId => () => {
        deleteGamePack(gameId);
    };

    return (
        <SandboxGames
            gamesInfo={gamesInfo.filter(gameInfo => gameInfo.creatorId === userId)}
            handleRedirection={handleRedirection}
            handleGamePackDeletion={handleGamePackDeletion}
        />
    );
}

SandboxGamesContainer.propTypes = {
    gamesInfo: PropTypes.arrayOf(
        PropTypes.shape({
            creatorId: PropTypes.number.isRequired,
        }).isRequired,
    ).isRequired,
    pullGamesInfo: PropTypes.func.isRequired,
    clearGameInfo: PropTypes.func.isRequired,
    deleteGamePack: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
    history: PropTypes.object.isRequired,
};

const mapStateToProps = store => {
    return {
        gamesInfo: store.game.gamesInfo,
        userId: store.access.userId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        pullGamesInfo: () => dispatch(gameApiActions.pullGamesInfo()),
        clearGameInfo: () => dispatch(gameActions.clearGameInfo()),
        deleteGamePack: gameId => dispatch(gameApiActions.deleteGamePack(gameId))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SandboxGamesContainer));
