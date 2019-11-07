import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { receiveGameInfo } from 'src/actions/gamesApiActions';

function withReceivedTrainingInfo(WrappedComponent) {
  function WithReceivedTrainingInfo(props) {
    const params = useParams();

    const { gameId, levelsInfo } = useSelector(store => store.games.gameInfo);

    const dispatch = useDispatch();

    const paramCategoryId = +params.categoryId;

    useEffect(() => {
      if (gameId !== paramCategoryId) {
        dispatch(receiveGameInfo(paramCategoryId));
      }
    }, [gameId, paramCategoryId, dispatch]);

    return (
      gameId === paramCategoryId && (
        <WrappedComponent gameId={gameId} levelsInfo={levelsInfo} {...props} />
      )
    );
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithReceivedTrainingInfo.displayName = `withReceivedTrainingInfo(${wrappedComponentName})`;

  return WithReceivedTrainingInfo;
}

export default withReceivedTrainingInfo;
