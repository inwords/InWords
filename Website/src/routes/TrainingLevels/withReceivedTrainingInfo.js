import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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

  WithReceivedTrainingInfo.propTypes = {
    match: PropTypes.object.isRequired
  };

  return WithReceivedTrainingInfo;
}

export default withReceivedTrainingInfo;
