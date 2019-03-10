import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class GameLevelCard extends Component {
    handleClickPullGameLevel = () => {
        this.props.pullGameLevel(this.props.levelInfo.levelID);
    };

    render() {
        const { levelInfo } = this.props;
        
        return (
            <div className="col-sm-4">
                <div className="card text-center text-white bg-primary mb-3">
                    <div className="card-body">
                        <h5 className="card-title">
                            Уровень {levelInfo.level}
                        </h5>
                        <p className="card-text">
                            {Array(levelInfo.playerStars).fill().map((item, index) =>
                                <Fragment key={index}>&#9733;</Fragment>)
                            }
                            {Array(levelInfo.totalStars - levelInfo.playerStars).fill().map((item, index) =>
                                <Fragment key={index}>&#9734;</Fragment>)
                            }
                        </p>
                        {levelInfo.isAvailable ?
                            <button type="button" className="btn btn-outline-secondary"
                                onClick={this.handleClickPullGameLevel} >
                                Выбрать
                            </button> :
                            <button type="button" className="btn btn-outline-secondary" disabled>
                                Выбрать
                            </button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

GameLevelCard.propTypes = {
    levelInfo: PropTypes.object.isRequired,
    pullGameLevel: PropTypes.func.isRequired
};

export default GameLevelCard;
