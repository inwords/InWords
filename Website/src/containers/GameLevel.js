import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GameActions } from '../actions/GameActions';

class GameLevel extends Component {
    static propTypes = {
        levelInfo: PropTypes.object.isRequired,
        pullGameLevel: PropTypes.func.isRequired
    };

    handlePullGameLevel = () => {
        this.props.pullGameLevel(this.props.levelInfo.levelId);
    };

    render() {
        const { levelInfo } = this.props;

        return (
            <div className="card text-center text-white bg-primary mb-3">
                <div className="card-body">
                    <h5 className="card-title">Уровень {levelInfo.level}</h5>
                    <p className="card-text">
                        {Array(levelInfo.playerStars).fill().map((item, index) =>
                            <Fragment key={index}>&#9733;</Fragment>)}
                        {Array(3 - levelInfo.playerStars).fill().map((item, index) =>
                            <Fragment key={index}>&#9734;</Fragment>)}
                    </p>
                    <button type="button" className="btn btn-outline-secondary"
                        disabled={!levelInfo.isAvailable} onClick={this.handlePullGameLevel}>Выбрать</button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        pullGameLevel: (levelId) => dispatch(GameActions.pullGameLevel(levelId))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(GameLevel);
