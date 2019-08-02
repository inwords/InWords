import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { receiveGameInfo as receiveGameInfoAction } from 'actions/gamesApiActions';

function withReceivedGameInfo(WrappedComponent) {
  function WithReceivedGameInfo({ match, ...rest }) {
    const gameInfo = useSelector(store => store.games.gameInfo);

    const dispatch = useDispatch();
    const receiveGameInfo = useCallback(
      gameId => dispatch(receiveGameInfoAction(gameId)),
      [dispatch]
    );

    const parsedGameId = useMemo(() => parseInt(match.params.gameId), [
      match.params.gameId,
    ]);

    useEffect(() => {
      if (gameInfo.gameId !== parsedGameId) {
        receiveGameInfo(parsedGameId);
      }
    }, [gameInfo.gameId, parsedGameId, receiveGameInfo]);

    return (
      gameInfo.gameId === parsedGameId && (
        <WrappedComponent levelsInfo={gameInfo.levelsInfo} {...rest} />
      )
    );
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithReceivedGameInfo.displayName = `withReceivedGameInfo(${wrappedComponentName})`;

  return withRouter(WithReceivedGameInfo);
}

export default withReceivedGameInfo;
