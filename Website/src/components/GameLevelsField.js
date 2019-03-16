import React from 'react';
import PropTypes from 'prop-types';
import GameLevel from '../containers/GameLevel';

function GameLevelsField({ gameInfo }) {
    return (
        <div className="row">
            {gameInfo.levelInfos.map((levelInfo) =>
                <div className="col-sm-4" key={levelInfo.levelId}>
                    <GameLevel levelInfo={levelInfo} />
                </div>)}
        </div>
    );
}

GameLevelsField.propTypes = {
    gameInfo: PropTypes.object.isRequired
};

export default GameLevelsField;
