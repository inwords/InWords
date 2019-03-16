import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GameActions } from '../actions/GameActions';
import GamesInfoField from '../components/GamesInfoField';
import GameLevelsField from '../components/GameLevelsField';
import GameWordsField from '../components/GameWordsField';

class GamePage extends Component {
    static propTypes = {
        gameInfo: PropTypes.object,
        gameLevel: PropTypes.object,
        pullGamesInfo: PropTypes.func.isRequired,
        resetGameInfo: PropTypes.func.isRequired,
        resetGameLevel: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.pullGamesInfo();
    }

    handleClickResetGameInfo = () => {
        this.props.resetGameInfo();
    };

    handleClickResetGameLevel = () => {
        this.props.resetGameLevel();
    };

    render() {
        const { gamesInfo, gameInfo, gameLevel } = this.props;

        return (
            <Fragment>
                {gameInfo ?
                    <div className="p-2 mb-3">
                        <div className="btn-group" role="group">
                            {gameInfo && !gameLevel ?
                                <button type="button" className="btn btn-outline-primary"
                                    onClick={this.handleClickResetGameInfo}>Назад к играм</button> :
                                <button type="button" className="btn btn-outline-primary"
                                    onClick={this.handleClickResetGameLevel}>Назад к уровням</button>}
                        </div>
                    </div> :
                    <Fragment />}
                {!gameInfo ?
                    <GamesInfoField gamesInfo={gamesInfo} /> :
                    !gameLevel ?
                        <GameLevelsField gameInfo={gameInfo} /> :
                        <GameWordsField gameLevel={gameLevel} />}
            </Fragment>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        gamesInfo: store.game.gamesInfo,
        gameInfo: store.game.gameInfo,
        gameLevel: store.game.gameLevel
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        pullGamesInfo: () => dispatch(GameActions.pullGamesInfo()),
        resetGameInfo: () => dispatch(GameActions.resetGameInfo()),
        resetGameLevel: () => dispatch(GameActions.resetGameLevel())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GamePage);
