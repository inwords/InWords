import React from 'react';
import PropTypes from 'prop-types';
import GameInfoContainer from '../../containers/Game/GameInfoContainer';

function GamesInfoField({ gamesInfo }) {
    return (
        <div className="row">
            {gamesInfo.map((gameInfo) =>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex" key={gameInfo.gameId}>
                    <GameInfoContainer gameInfo={gameInfo} />
                </div>)}
        </div>
    );
}

GamesInfoField.propTypes = {
    gamesInfo: PropTypes.array.isRequired
};

export default GamesInfoField;
