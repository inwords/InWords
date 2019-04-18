import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gameApiActions from '../../../actions/gameApiActions';
import LearningGames from './LearningGames';

function LearningGamesContainer({ gamesInfo, pullGamesInfo, userId }) {
    useEffect(() => {
        if (!gamesInfo.length) {
            pullGamesInfo();
        }
    }, []);

    return <LearningGames gamesInfo={gamesInfo.filter(gameInfo => gameInfo.creatorId !== userId)} />;
}

LearningGamesContainer.propTypes = {
    gamesInfo: PropTypes.arrayOf(
        PropTypes.shape({
            creatorId: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
    pullGamesInfo: PropTypes.func.isRequired,
    userId: PropTypes.number
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LearningGamesContainer);
