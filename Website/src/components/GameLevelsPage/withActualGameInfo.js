import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import gameApiActions from '../../actions/gameApiActions';

function withActualGameInfo(WrappedComponent) {
    function WithActualGameInfo({ gameInfo, pullGameInfo, match, ...other }) {
        React.useEffect(() => {
            if (gameInfo.gameId !== parseInt(match.params.gameId)) {
                pullGameInfo(parseInt(match.params.gameId));
            }
        }, [match.params.gameId]);

        return (
            gameInfo.gameId === parseInt(match.params.gameId) && (
                <WrappedComponent
                    gameInfo={gameInfo}
                    {...other}
                />)
        );
    }

    WithActualGameInfo.propTypes = {
        gameInfo: PropTypes.shape({
            gameId: PropTypes.number
        }).isRequired,
        pullGameInfo: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired
    };

    const mapStateToProps = store => {
        return {
            gameInfo: store.game.gameInfo
        };
    };

    const mapDispatchToProps = dispatch => {
        return {
            pullGameInfo: gameId => dispatch(gameApiActions.pullGameInfo(gameId))
        };
    };

    const wrappedComponentName = WrappedComponent.displayName
        || WrappedComponent.name
        || 'Component';

    WithActualGameInfo.displayName = `withActualGameInfo(${wrappedComponentName})`;

    return withRouter(connect(
        mapStateToProps,
        mapDispatchToProps
    )(WithActualGameInfo));
}

export default withActualGameInfo;
