import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gameApiActions from '../../actions/gameApiActions';
import Games from '../../components/Game/Games';

function GamesPage({ gamesInfo, pullGamesInfo, history }) {
    const handleRedirection = gameId => () => {
        history.push(`/games/game/${gameId}`)
    };

    useEffect(() => {
        pullGamesInfo();
    }, []);

    return (
        gamesInfo && (
            <Games
                gamesInfo={gamesInfo}
                handleRedirection={handleRedirection}
            />)
    );
}

GamesPage.propTypes = {
    gamesInfo: PropTypes.array,
    pullGamesInfo: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

const mapStateToProps = store => {
    return {
        gamesInfo: store.game.gamesInfo
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
)(GamesPage));
