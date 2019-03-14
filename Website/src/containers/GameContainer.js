import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GameActions } from '../actions/GameActions';
import { ErrorMessageActions } from '../actions/ErrorMessageActions';
import Game from '../components/Game';
import GameInfoCard from '../components/GameInfoCard';
import GameLevelCard from '../components/GameLevelCard';
import GameField from '../components/GameField';

class GameContainer extends Component {
    render() {
        const {
            gamesInfo,
            gameInfo,
            gameLevel,
            pullGamesInfoAction,
            pullGameInfoAction,
            pullGameLevelAction,
            completeGameAction
        } = this.props;

        function SmartGameInfoCard({ gameInfo }) {
            return <GameInfoCard
                gameInfo={gameInfo}
                pullGameInfo={pullGameInfoAction}
            />;
        }

        function SmartGameLevelCard({ levelInfo }) {
            return <GameLevelCard
                levelInfo={levelInfo}
                pullGameLevel={pullGameLevelAction}
            />;
        }

        function SmartGameField({ gameLevel }) {
            return <GameField
                gameLevel={gameLevel}
                completeGame={completeGameAction}
            />;
        }

        return (
            <Game
                smartGameInfoCard={SmartGameInfoCard}
                smartGameLevelCard={SmartGameLevelCard}
                smartGameField={SmartGameField}
                gamesInfo={gamesInfo}
                gameInfo={gameInfo}
                gameLevel={gameLevel}
                pullGamesInfo={pullGamesInfoAction}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        gamesInfo: store.game.gamesInfo,
        gameInfo: store.game.gameInfo,
        gameLevel: store.game.gameLevel,
        errorMessage: store.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        pullGamesInfoAction: () => dispatch(GameActions.pullGamesInfo()),
        pullGameInfoAction: (gameId) => dispatch(GameActions.pullGameInfo(gameId)),
        pullGameLevelAction: (levelId) => dispatch(GameActions.pullGameLevel(levelId)),
        completeGameAction: () => dispatch(GameActions.completeGame()),
        resetErrorMessageAction: () => dispatch(ErrorMessageActions.resetErrorMessage())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameContainer);
