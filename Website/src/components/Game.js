import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Game extends Component {
    componentDidMount() {
        this.props.pullGamesInfo();
    }

    render() {
        const { gamesInfo, gameInfo, gameLevel } = this.props;
        const SmartGameInfoCard = this.props.smartGameInfoCard;
        const SmartGameLevelCard = this.props.smartGameLevelCard;
        const SmartGameField = this.props.smartGameField;

        return (
            <Fragment>
                {!gameInfo ?
                    <div className="row">
                        {gamesInfo.map((gameInfo) =>
                            <SmartGameInfoCard
                                key={gameInfo.gameID}
                                gameInfo={gameInfo}
                            />)}
                    </div> :
                    !gameLevel ?
                        <div className="row">
                            {gameInfo.levelInfos.map((levelInfo) =>
                                <SmartGameLevelCard
                                    key={levelInfo.levelID}
                                    levelInfo={levelInfo}
                                />)}
                        </div> :
                        <SmartGameField gameLevel={gameLevel} />}
            </Fragment>
        );
    }
}

Game.propTypes = {
    smartGameInfoCard: PropTypes.func.isRequired,
    smartGameLevelCard: PropTypes.func.isRequired,
    smartGameField: PropTypes.func.isRequired,
    gamesInfo: PropTypes.array.isRequired,
    gameInfo: PropTypes.object,
    gameLevel: PropTypes.object,
    pullGamesInfo: PropTypes.func.isRequired
};

export default Game;
