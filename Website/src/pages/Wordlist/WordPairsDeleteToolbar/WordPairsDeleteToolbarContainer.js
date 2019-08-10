import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'actions/commonActions';
import { deleteWordPairs as deleteWordPairsAction } from 'actions/wordPairsApiActions';
import WordPairsDeleteToolbar from './WordPairsDeleteToolbar';

function WordPairsDeleteToolbarContainer({ checkedValues, ...rest }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const deleteWordPairs = pairIds => {
      dispatch(deleteWordPairsAction(pairIds));
    };

    let timeoutID = setTimeout(() => {
      deleteWordPairs(checkedValues);
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
      numberOfChecked={checkedValues.length}
      handleDelete={handleDelete}
      {...rest}
    />
  );
}

WordPairsDeleteToolbarContainer.propTypes = {
  checkedValues: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  handleReset: PropTypes.func
};

export default WordPairsDeleteToolbarContainer;
