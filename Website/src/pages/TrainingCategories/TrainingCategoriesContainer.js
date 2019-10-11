import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveGamesInfo } from 'src/actions/gamesApiActions';
import TrainingCategories from './TrainingCategories';

function TrainingCategoriesContainer({ ...rest }) {
  const gamesInfo = useSelector(store => store.games.gamesInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!gamesInfo.length) {
      dispatch(receiveGamesInfo());
    }
  }, [gamesInfo.length, dispatch]);

  return <TrainingCategories gamesInfo={gamesInfo} {...rest} />;
}

export default TrainingCategoriesContainer;
