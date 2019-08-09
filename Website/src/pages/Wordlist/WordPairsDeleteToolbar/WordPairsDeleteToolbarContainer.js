import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'actions/commonActions';
import { deleteWordPairs as deleteWordPairsAction } from 'actions/wordPairsApiActions';
import WordPairsDeleteToolbar from './WordPairsDeleteToolbar';

function WordPairsDeleteToolbarContainer({ checked, ...rest }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const deleteWordPairs = pairIds => {
      dispatch(deleteWordPairsAction(pairIds));
    };

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
    <WordPairsDeleteToolbar
      numberOfSelected={checked.length}
      handleDelete={handleDelete}
      {...rest}
    />
  );
}

WordPairsDeleteToolbarContainer.propTypes = {
  checked: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  handleReset: PropTypes.func
};

export default WordPairsDeleteToolbarContainer;
