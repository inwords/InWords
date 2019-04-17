import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gameApiActions from '../../../actions/gameApiActions';
import SandboxGames from './SandboxGames';

function SandboxGamesContainer({ gamesInfo, pullGamesInfo, deleteGamePack, userId, history }) {
    useEffect(() => {
        if (!gamesInfo.length) {
            pullGamesInfo();
        }
    }, []);

    const handleRedirection = gameId => () => {
        history.push(`/game/${gameId}`);
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
        deleteGamePack: gameId => dispatch(gameApiActions.deleteGamePack(gameId))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SandboxGamesContainer));
