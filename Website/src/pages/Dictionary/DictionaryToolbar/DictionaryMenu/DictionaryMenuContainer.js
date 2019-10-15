import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { initializeGameLevel } from 'actions/gamesActions';
import DictionaryMenu from './DictionaryMenu';

function DictionaryMenuContainer({ checkedValues, ...rest }) {
  const wordPairs = useSelector(store => store.wordPairs);

  const dispatch = useDispatch();
  const handleLearning = useCallback(() => {
    dispatch(
      initializeGameLevel({
        levelId: 0,
        wordTranslations: wordPairs.filter(({ serverId }) =>
          checkedValues.includes(serverId)
        )
      })
    );
  }, [dispatch, checkedValues, wordPairs]);

  return <DictionaryMenu handleLearning={handleLearning} {...rest} />;
}

DictionaryMenuContainer.propTypes = {
  checkedValues: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  disabled: PropTypes.bool
};

export default memo(DictionaryMenuContainer);
