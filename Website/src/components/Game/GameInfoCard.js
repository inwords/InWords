import React from 'react';
import PropTypes from 'prop-types';

function GameInfoCard({ gameInfo, handlePullGameInfo }) {
    const { title, isAvailable } = gameInfo;

    return (
        <div className="card flex-fill text-center text-white bg-primary mb-3">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <button type="button" className="btn btn-outline-secondary"
                    disabled={!isAvailable} onClick={handlePullGameInfo}>Выбрать</button>
            </div>
        </div>
    );
}

GameInfoCard.propTypes = {
    gameInfo: PropTypes.object.isRequired,
    handlePullGameInfo: PropTypes.func.isRequired
};

export default GameInfoCard;
