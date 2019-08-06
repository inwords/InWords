import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { receiveGameLevel as receiveGameLevelAction } from 'actions/gamesApiActions';

function withReceivedGameLevel(WrappedComponent) {
  function WithReceivedGameLevel({ match, ...rest }) {
    const gameLevel = useSelector(store => store.games.gameLevel);

    const dispatch = useDispatch();

    const parsedLevelId = parseInt(match.params.levelId);

    useEffect(() => {
      if (gameLevel.levelId !== parsedLevelId) {
        const receiveGameLevel = levelId =>
          dispatch(receiveGameLevelAction(levelId));

        receiveGameLevel(parsedLevelId);
      }
    }, [gameLevel.levelId, parsedLevelId, dispatch]);

    return (
      gameLevel.levelId === parsedLevelId && (
        <WrappedComponent gameLevel={gameLevel} {...rest} />
      )
    );
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithReceivedGameLevel.displayName = `withReceivedGameLevel(${wrappedComponentName})`;

  WithReceivedGameLevel.propTypes = {
    match: PropTypes.object.isRequired
  };

  return WithReceivedGameLevel;
}

export default withReceivedGameLevel;
