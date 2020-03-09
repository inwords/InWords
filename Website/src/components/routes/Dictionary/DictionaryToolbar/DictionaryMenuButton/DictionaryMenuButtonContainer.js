import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { initializeLevel } from 'src/actions/trainingActions';
import DictionaryMenuButton from './DictionaryMenuButton';

function DictionaryMenuButtonContainer({ checkedValues }) {
  const { wordPairs } = useSelector(store => store.dictionary);

  const dispatch = useDispatch();
  const handleLearning = () => {
    dispatch(
      initializeLevel({
        levelId: -1,
        wordTranslations: wordPairs.filter(({ serverId }) =>
          checkedValues.includes(serverId)
        )
      })
    );
  };

  return <DictionaryMenuButton handleLearning={handleLearning} />;
}

DictionaryMenuButtonContainer.propTypes = {
  checkedValues: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
};

export default memo(DictionaryMenuButtonContainer);
