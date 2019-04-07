import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gameActions from '../../actions/gameActions';
import gameApiActions from '../../actions/gameApiActions';
import Games from '../../components/Game/Games';

function GamesPage({ gamesInfo, pullGamesInfo, clearGameInfo, history }) {
    const handleRedirection = gameId => () => {
        clearGameInfo();
        history.push(`/games_catalog/game/${gameId}`);
    };

    useEffect(() => {
        pullGamesInfo();
    }, []);

    return (
        <Games
            gamesInfo={gamesInfo}
            handleRedirection={handleRedirection}
        />
    );
}

GamesPage.propTypes = {
    gamesInfo: PropTypes.array.isRequired,
    pullGamesInfo: PropTypes.func.isRequired,
    clearGameInfo: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

const mapStateToProps = store => {
    return {
        gamesInfo: store.game.gamesInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        pullGamesInfo: () => dispatch(gameApiActions.pullGamesInfo()),
        clearGameInfo: () => dispatch(gameActions.clearGameInfo())
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(GamesPage));
