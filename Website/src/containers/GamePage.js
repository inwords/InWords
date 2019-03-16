import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GamesInfoField from './GamesInfoField';
import GameLevelsField from './GameLevelsField';
import GameField from './GameField';

class GamePage extends Component {
    static propTypes = {
        gameInfo: PropTypes.object,
        gameLevel: PropTypes.object
    };

    render() {
        const { gameInfo, gameLevel } = this.props;

        return (
            <Fragment>
                {!gameInfo ?
                    <GamesInfoField /> :
                    !gameLevel ?
                        <GameLevelsField /> :
                        <GameField gameLevel={gameLevel} />}
            </Fragment>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        gameInfo: store.game.gameInfo,
        gameLevel: store.game.gameLevel
    };
};

export default connect(
    mapStateToProps
)(GamePage);
