import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GameActions } from '../../actions/GameActions';
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
                levelInfo={levelInfo}
                handlePullGameLevel={this.handlePullGameLevel}
            />
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
)(GameLevelCardContainer);
