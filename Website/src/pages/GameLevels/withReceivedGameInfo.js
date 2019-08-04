import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveGameInfo as receiveGameInfoAction } from 'actions/gamesApiActions';

function withReceivedGameInfo(WrappedComponent) {
  function WithReceivedGameInfo({ match, ...rest }) {
    const gameInfo = useSelector(store => store.games.gameInfo);

    const dispatch = useDispatch();

    const parsedGameId = parseInt(match.params.gameId);

    useEffect(() => {
      if (gameInfo.gameId !== parsedGameId) {
        const receiveGameInfo = gameId =>
          dispatch(receiveGameInfoAction(gameId));

        receiveGameInfo(parsedGameId);
      }
    }, [gameInfo.gameId, parsedGameId, dispatch]);

    return (
      gameInfo.gameId === parsedGameId && (
        <WrappedComponent levelsInfo={gameInfo.levelsInfo} {...rest} />
      )
    );
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithReceivedGameInfo.displayName = `withReceivedGameInfo(${wrappedComponentName})`;

  return WithReceivedGameInfo;
}

export default withReceivedGameInfo;
