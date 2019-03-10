import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GameActions } from '../actions/GameActions';
import { ErrorActions } from '../actions/ErrorActions';
import WrapperWithErrorHandling from '../components/WrapperWithErrorHandling';
import Game from '../components/Game';
import GameInfoCard from '../components/GameInfoCard';
import GameLevelCard from '../components/GameLevelCard';

class GameContainer extends Component {
    render() {
        const {
            errorMessage,
            gamesInfo,
            gameInfo,
            gameLevel,
            pullGamesInfoAction,
            pullGameInfoAction,
            pullGameLevelAction,
            resetErrorMessageAction
        } = this.props;

        const SmartGameInfoCard = ({ gameInfo }) =>
            <GameInfoCard
                gameInfo={gameInfo}
                pullGameInfo={pullGameInfoAction}
            />;

        const SmartGameLevelCard = ({ levelInfo }) =>
            <GameLevelCard
                levelInfo={levelInfo}
                pullGameLevel={pullGameLevelAction}
            />;

        return (
            <WrapperWithErrorHandling
                errorMessage={errorMessage}
                resetErrorMessage={resetErrorMessageAction} >
                <Game
                    smartGameInfoCard={SmartGameInfoCard}
                    smartGameLevelCard={SmartGameLevelCard}
                    gamesInfo={gamesInfo}
                    gameInfo={gameInfo}
                    gameLevel={gameLevel}
                    pullGamesInfo={pullGamesInfoAction}
                />
            </WrapperWithErrorHandling>
        );
    }
}

const mapStateToProps = store => {
    return {
        gamesInfo: store.game.gamesInfo,
        gameInfo: store.game.gameInfo,
        gameLevel: store.game.gameLevel,
        errorMessage: store.errorMessage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        pullGamesInfoAction: () => dispatch(GameActions.pullGamesInfo()),
        pullGameInfoAction: (gameId) => dispatch(GameActions.pullGameInfo(gameId)),
        pullGameLevelAction: (levelId) => dispatch(GameActions.pullGameLevel(levelId)),
        resetErrorMessageAction: () => dispatch(ErrorActions.resetErrorMessage())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameContainer);
