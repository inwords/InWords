import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { deleteWordPairs as deleteWordPairsLocal } from 'src/actions/dictionaryActions';
import { deleteWordPairs } from 'src/actions/dictionaryApiActions';
import Button from 'src/components/core/Button';
import Dialog from 'src/components/core/Dialog';
import DialogTitle from 'src/components/core/DialogTitle';
import DialogContent from 'src/components/core/DialogContent';
import DialogContentText from 'src/components/core/DialogContentText';
import DialogActions from 'src/components/core/DialogActions';

function WordPairsDeleteDialogContainer({
  open,
  handleClose,
  checkedValues,
  handleReset
}) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteWordPairs(checkedValues));
      dispatch(deleteWordPairsLocal(checkedValues));
      handleReset();
    } catch (error) {
      dispatch(setSnackbar({ text: 'Не удалось удалить слова' }));
    }
  };

  return (
    <Dialog
      aria-labelledby="word-pairs-delete-dialog"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="word-pairs-delete-dialog">Удаление слов</DialogTitle>
      <DialogContent>
        <DialogContentText>Удалить выбранные слова?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          Отменить
        </Button>
        <Button
          variant="text"
          color="primary"
          onClick={() => {
            handleDelete();
            handleClose();
          }}
        >
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

WordPairsDeleteDialogContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  checkedValues: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  handleReset: PropTypes.func.isRequired
};

export default WordPairsDeleteDialogContainer;
