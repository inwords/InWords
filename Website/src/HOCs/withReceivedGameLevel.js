import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { receiveGameLevel as receiveGameLevelAction } from 'src/actions/gamesApiActions';

function withReceivedGameLevel(WrappedComponent) {
  function WithReceivedGameLevel({ match, history, ...rest }) {
    const { levelId, wordTranslations } = useSelector(
      store => store.games.gameLevel
    );

    const dispatch = useDispatch();

    const paramLevelId = +match.params.levelId;

    React.useEffect(() => {
      if (levelId !== paramLevelId) {
        if (paramLevelId === 0) {
          history.push('/dictionary');
        }

        dispatch(receiveGameLevelAction(paramLevelId));
      }
    }, [levelId, paramLevelId, dispatch, history]);

    return (
      levelId === paramLevelId && (
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
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  return WithReceivedGameLevel;
}

export default withReceivedGameLevel;
