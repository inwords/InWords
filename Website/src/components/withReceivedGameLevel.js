import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { receiveGameLevel as receiveGameLevelAction } from 'actions/gamesApiActions';

function withReceivedGameLevel(WrappedComponent) {
  function WithReceivedGameLevel({ match, ...rest }) {
    const { levelId, wordTranslations } = useSelector(
      store => store.games.gameLevel
    );

    const dispatch = useDispatch();

    const parsedLevelId = parseInt(match.params.levelId);

    useEffect(() => {
      if (levelId !== parsedLevelId) {
        dispatch(receiveGameLevelAction(parsedLevelId));
      }
    }, [levelId, parsedLevelId, dispatch]);

    return (
      levelId === parsedLevelId && (
        <WrappedComponent
          levelId={levelId}
          wordTranslations={wordTranslations}
          {...rest}
        />
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
