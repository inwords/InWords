import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GameActions } from '../../actions/GameActions';
import GameInfoCard from '../../components/Game/GameInfoCard';

class GameInfoCardContainer extends Component {
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
            <GameInfoCard
                title={gameInfo.title}
                isAvailable={gameInfo.isAvailable}
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
)(GameInfoCardContainer);
