import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GameActions } from '../../actions/GameActions';
import GameInfo from '../../components/Game/GameInfo';

class GameInfoContainer extends Component {
    static propTypes = {
        gameInfo: PropTypes.object.isRequired,
        pullGameInfo: PropTypes.func.isRequired
    };

    handlePullGameInfo = () => {
        this.props.pullGameInfo(this.props.gameInfo.gameId);
    };

    render() {
        const { gameInfo } = this.props;

        return (
            <GameInfo
                gameInfo={gameInfo}
                handlePullGameInfo={this.handlePullGameInfo}
            />
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
)(GameInfoContainer);
