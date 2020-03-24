import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { deleteWordPairs as deleteWordPairsLocal } from 'src/actions/dictionaryActions';
import { deleteWordPairs } from 'src/actions/dictionaryApiActions';
import WordPairsDeleteDialog from './WordPairsDeleteDialog';

function WordPairsDeleteDialogContainer({
  checkedValues,
  handleReset,
  ...rest
}) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    (async () => {
      try {
        await dispatch(deleteWordPairs(checkedValues));
        dispatch(deleteWordPairsLocal(checkedValues));
        handleReset();
      } catch (error) {
        dispatch(setSnackbar({ text: 'Не удалось удалить слова' }));
      }
    })();
  };

  return <WordPairsDeleteDialog handleDelete={handleDelete} {...rest} />;
}

WordPairsDeleteDialogContainer.propTypes = {
  checkedValues: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  handleReset: PropTypes.func.isRequired,
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

export default WordPairsDeleteDialogContainer;
