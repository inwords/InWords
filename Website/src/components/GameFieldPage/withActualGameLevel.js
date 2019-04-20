import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import gameApiActions from '../../actions/gameApiActions';

function withActualGameLevel(WrappedComponent) {
    function WithActualGameLevel({ gameLevel, pullGameLevel, match, ...other }) {
        React.useEffect(() => {
            if (gameLevel.levelId !== parseInt(match.params.levelId)) {
                pullGameLevel(parseInt(match.params.levelId));
            }
        }, [match.params.levelId]);

        return (
            gameLevel.levelId === parseInt(match.params.levelId) && (
                <WrappedComponent
                    gameLevel={gameLevel}
                    {...other}
                />)
        );
    }

    WithActualGameLevel.propTypes = {
        gameLevel: PropTypes.shape({
            levelId: PropTypes.number
        }).isRequired,
        pullGameLevel: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired
    };

    const mapStateToProps = store => {
        return {
            gameLevel: store.game.gameLevel
        };
    };

    const mapDispatchToProps = dispatch => {
        return {
            pullGameLevel: levelId => dispatch(gameApiActions.pullGameLevel(levelId))
        };
    };

    const wrappedComponentName = WrappedComponent.displayName
        || WrappedComponent.name
        || 'Component';

    WithActualGameLevel.displayName = `withActualGameLevel(${wrappedComponentName})`;

    return withRouter(connect(
        mapStateToProps,
        mapDispatchToProps
    )(WithActualGameLevel));
}

export default withActualGameLevel;
