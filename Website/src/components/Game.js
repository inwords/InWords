import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import GameField from './GameField';

class Game extends Component {
    componentDidMount() {
        this.props.pullGamesInfo();
    }

    render() {
        const { gamesInfo, gameInfo, gameLevel } = this.props;
        const SmartGameInfoCard = this.props.smartGameInfoCard;
        const SmartGameLevelCard = this.props.smartGameLevelCard;

        return (
            <Fragment>
                {!gameInfo ?
                    <div className="row">
                        {gamesInfo.map((gameInfo) =>
                            <SmartGameInfoCard
                                key={gameInfo.gameID}
                                gameInfo={gameInfo}
                            />)
                        }
                    </div> :
                    !gameLevel ?
                        <div className="row">
                            {gameInfo.levelInfos.map((levelInfo) =>
                                <SmartGameLevelCard
                                    key={levelInfo.levelID}
                                    levelInfo={levelInfo}
                                />)
                            }
                        </div> :
                        <GameField gameLevel={gameLevel} />
                }
            </Fragment>
        );
    }
}

Game.propTypes = {
    smartGameInfoCard: PropTypes.func.isRequired,
    gamesInfo: PropTypes.array.isRequired,
    gameInfo: PropTypes.object,
    gameLevel: PropTypes.object,
    pullGamesInfo: PropTypes.func.isRequired
};

export default Game;
