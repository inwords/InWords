import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteWordPairs as deleteWordPairsAction } from 'actions/wordPairsApiActions';
import WordPairsDeleteAppbar from './WordPairsDeleteAppbar';

function WordPairsDeleteAppbarContainer({ checked, ...rest }) {
  const dispatch = useDispatch();

  const handleDelete = actionOnSuccess => {
    const deleteWordPairs = (pairIds, actionOnSuccess) =>
      dispatch(deleteWordPairsAction(pairIds, actionOnSuccess));

    deleteWordPairs(checked, actionOnSuccess);
  };

  return (
    <WordPairsDeleteAppbar
      numberOfSelected={checked.length}
      handleDelete={handleDelete}
      {...rest}
    />
  );
}

WordPairsDeleteAppbarContainer.propTypes = {
  checked: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  handleReset: PropTypes.func
};

export default WordPairsDeleteAppbarContainer;
