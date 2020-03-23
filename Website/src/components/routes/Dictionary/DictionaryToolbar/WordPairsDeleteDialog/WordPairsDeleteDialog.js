import React from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/core/Button';
import Dialog from 'src/components/core/Dialog';
import DialogTitle from 'src/components/core/DialogTitle';
import DialogContent from 'src/components/core/DialogContent';
import DialogContentText from 'src/components/core/DialogContentText';
import DialogActions from 'src/components/core/DialogActions';

function WordPairsDeleteDialog({ open, handleClose, handleDelete }) {
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
            handleClose();
          }}
        >
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

WordPairsDeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default WordPairsDeleteDialog;
