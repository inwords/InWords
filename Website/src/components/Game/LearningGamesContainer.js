import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gameApiActions from '../../actions/gameApiActions';
import LearningGames from './LearningGames';

function LearningGamesContainer({ gamesInfo, pullGamesInfo, userId, history }) {
    useEffect(() => {
        if (!gamesInfo.length) {
            pullGamesInfo();
        }
    }, []);

    const handleRedirection = gameId => () => {
        history.push(`/games/game/${gameId}`);
    };

    return (
        <LearningGames
            gamesInfo={gamesInfo.filter(gameInfo => gameInfo.creatorId !== userId)}
            handleRedirection={handleRedirection}
        />
    );
}

LearningGamesContainer.propTypes = {
    gamesInfo: PropTypes.arrayOf(
        PropTypes.shape({
            creatorId: PropTypes.number.isRequired,
        }).isRequired,
    ).isRequired,
    pullGamesInfo: PropTypes.func.isRequired,
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
        pullGamesInfo: () => dispatch(gameApiActions.pullGamesInfo())
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(LearningGamesContainer));
