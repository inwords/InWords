import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { gameApiActions } from '../../actions/gameApiActions';
import GameLevelCard from '../../components/Game/GameLevelCard';

class GameLevelCardContainer extends Component {
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
            <GameLevelCard
                level={levelInfo.level}
                playerStars={levelInfo.playerStars}
                isAvailable={levelInfo.isAvailable}
                handlePullGameLevel={this.handlePullGameLevel}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        pullGameLevel: (levelId) => dispatch(gameApiActions.pullGameLevel(levelId))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(GameLevelCardContainer);
