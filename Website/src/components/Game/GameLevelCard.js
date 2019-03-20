import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function GameLevelCard({ level, playerStars, isAvailable, handlePullGameLevel }) {
    return (
        <div className="card flex-fill text-center text-white bg-primary mb-3">
            <div className="card-body">
                <h5 className="card-title">Уровень {level}</h5>
                <p className="card-text">
                    {Array(playerStars).fill().map((item, index) =>
                        <Fragment key={index}>&#9733;</Fragment>)}
                    {Array(3 - playerStars).fill().map((item, index) =>
                        <Fragment key={index}>&#9734;</Fragment>)}
                </p>
                <button type="button" className="btn btn-outline-secondary"
                    disabled={!isAvailable} onClick={handlePullGameLevel}>Выбрать</button>
            </div>
        </div>
    );
}

GameLevelCard.propTypes = {
    level: PropTypes.number.isRequired,
    playerStars: PropTypes.number.isRequired,
    isAvailable: PropTypes.bool.isRequired,
    handlePullGameLevel: PropTypes.func.isRequired
};

export default GameLevelCard;
