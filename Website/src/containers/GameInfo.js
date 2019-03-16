import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GameActions } from '../actions/GameActions';

class GameInfo extends Component {
    static propTypes = {
        gameInfo: PropTypes.object.isRequired,
        pullGameInfo: PropTypes.func.isRequired
    };

    handleClickPullGameInfo = () => {
        this.props.pullGameInfo(this.props.gameInfo.gameId);
    };

    render() {
        const { gameInfo } = this.props;

        return (
            <div className="col-sm-4">
                <div className="card text-center text-white bg-primary mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{gameInfo.title}</h5>
                        <button type="button" className="btn btn-outline-secondary" disabled={!gameInfo.isAvailable} onClick={this.handleClickPullGameInfo}>Выбрать</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        pullGameInfo: (gameId) => dispatch(GameActions.pullGameInfo(gameId))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(GameInfo);
