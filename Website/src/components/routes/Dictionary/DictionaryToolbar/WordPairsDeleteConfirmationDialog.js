import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteWordPairs } from 'src/actions/dictionaryApiActions';
import Button from 'src/components/core/Button';
import Dialog from 'src/components/core/Dialog';
import DialogTitle from 'src/components/core/DialogTitle';
import DialogContent from 'src/components/core/DialogContent';
import DialogContentText from 'src/components/core/DialogContentText';
import DialogActions from 'src/components/core/DialogActions';

function WordPairsDeleteConfirmationDialog({
  open,
  handleClose,
  checkedValues,
  handleReset
}) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteWordPairs(checkedValues));
  };

  return (
    <Dialog
      aria-labelledby="course-word-pairs-add-confirmation-dialog"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="course-word-pairs-add-confirmation-dialog">
        Удаление слов
      </DialogTitle>
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
            handleReset();
            handleClose();
          }}
        >
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

WordPairsDeleteConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  checkedValues: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  handleReset: PropTypes.func.isRequired
};

export default WordPairsDeleteConfirmationDialog;
