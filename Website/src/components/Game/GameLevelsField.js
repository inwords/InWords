import React from 'react';
import PropTypes from 'prop-types';
import GameLevelContainer from '../../containers/Game/GameLevelContainer';

function GameLevelsField({ gameInfo }) {
    return (
        <div className="row">
            {gameInfo.levelInfos.map((levelInfo) =>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex" key={levelInfo.levelId}>
                    <GameLevelContainer levelInfo={levelInfo} />
                </div>)}
        </div>
    );
}

GameLevelsField.propTypes = {
    gameInfo: PropTypes.object.isRequired
};

export default GameLevelsField;
