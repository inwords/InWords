import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'actions/commonActions';
import { deleteWordPairs as deleteWordPairsAction } from 'actions/wordPairsApiActions';
import WordPairsDeleteAppbar from './WordPairsDeleteAppbar';

function WordPairsDeleteAppbarContainer({ checked, ...rest }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const deleteWordPairs = pairIds => dispatch(deleteWordPairsAction(pairIds));

    let timeoutID = setTimeout(() => {
      deleteWordPairs(checked);
    }, 5100);

    dispatch(
      setSnackbar({
        text: 'Слова будут удалены через 5 секунд',
        actionText: 'Отменить',
        actionHandler: () => {
          clearTimeout(timeoutID);
        }
      })
    );
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
