import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { receiveGameInfo } from 'actions/gamesApiActions';

function withReceivedTrainingInfo(WrappedComponent) {
  function WithReceivedTrainingInfo({ match, ...rest }) {
    const { gameId, levelsInfo } = useSelector(store => store.games.gameInfo);

    const dispatch = useDispatch();

    const parsedCategoryId = parseInt(match.params.categoryId);

    useEffect(() => {
      if (gameId !== parsedCategoryId) {
        dispatch(receiveGameInfo(parsedCategoryId));
      }
    }, [gameId, parsedCategoryId, dispatch]);

    return (
      gameId === parsedCategoryId && (
        <WrappedComponent
          gameId={gameId}
          levelsInfo={levelsInfo}
          match={match}
          {...rest}
        />
      )
    );
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithReceivedTrainingInfo.displayName = `withReceivedTrainingInfo(${wrappedComponentName})`;

  WithReceivedTrainingInfo.propTypes = {
    match: PropTypes.object.isRequired
  };

  return WithReceivedTrainingInfo;
}

export default withReceivedTrainingInfo;
