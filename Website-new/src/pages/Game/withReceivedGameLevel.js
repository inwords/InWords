import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import gamesApiActions from '../../actions/gamesApiActions';

function withReceivedGameLevel(WrappedComponent) {
    function WithReceivedGameLevel({ match, ...rest }) {
        const gameLevel = useSelector(store => store.games.gameLevel);

        const dispatch = useDispatch();
        const receiveGameLevel = useCallback(
            levelId => dispatch(gamesApiActions.receiveGameLevel(levelId)),
            [dispatch]
        );

        const parsedLevelId = useMemo(() => parseInt(match.params.levelId), [match.params.levelId]);

        useEffect(() => {
            if (gameLevel.levelId !== parsedLevelId) {
                receiveGameLevel(parsedLevelId);
            }
        }, [gameLevel.levelId, parsedLevelId, receiveGameLevel]);

        return (
            gameLevel.levelId === parsedLevelId && (
                <WrappedComponent
                    wordTranslations={gameLevel.wordTranslations}
                    {...rest}
                />)
        );
    }

    const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    WithReceivedGameLevel.displayName = `withReceivedGameLevel(${wrappedComponentName})`;

    return withRouter(WithReceivedGameLevel);
}

export default withReceivedGameLevel;
