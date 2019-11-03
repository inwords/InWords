import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { initializeGameLevel } from 'src/actions/gamesActions';
import DictionaryMenuButton from './DictionaryMenuButton';

function DictionaryMenuButtonContainer({ checkedValues, ...rest }) {
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

  return <DictionaryMenuButton handleLearning={handleLearning} {...rest} />;
}

DictionaryMenuButtonContainer.propTypes = {
  checkedValues: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  disabled: PropTypes.bool
};

export default memo(DictionaryMenuButtonContainer);
