import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { receiveGameInfo as receiveGameInfoAction } from 'actions/gamesApiActions';

function withReceivedGameInfo(WrappedComponent) {
  function WithReceivedGameInfo({ match, ...rest }) {
    const { gameId, levelsInfo } = useSelector(store => store.games.gameInfo);

    const dispatch = useDispatch();

    const parsedGameId = parseInt(match.params.gameId);

    useEffect(() => {
      if (gameId !== parsedGameId) {
        const receiveGameInfo = gameId => {
          dispatch(receiveGameInfoAction(gameId));
        };

        receiveGameInfo(parsedGameId);
      }
    }, [gameId, parsedGameId, dispatch]);

    return (
      gameId === parsedGameId && (
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
  WithReceivedGameInfo.displayName = `withReceivedGameInfo(${wrappedComponentName})`;

  WithReceivedGameInfo.propTypes = {
    match: PropTypes.object.isRequired
  };

  return WithReceivedGameInfo;
}

export default withReceivedGameInfo;
