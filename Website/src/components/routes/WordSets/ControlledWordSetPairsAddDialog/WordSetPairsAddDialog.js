import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { resetWordPairsActuality } from 'src/actions/dictionaryActions';
import { addWordSetToDictionary } from 'src/actions/wordSetApiActions';
import Button from 'src/components/core/Button';
import Dialog from 'src/components/core/Dialog';
import DialogTitle from 'src/components/core/DialogTitle';
import DialogContent from 'src/components/core/DialogContent';
import DialogContentText from 'src/components/core/DialogContentText';
import DialogActions from 'src/components/core/DialogActions';

function WordSetPairsAddDialog({ open, handleClose, gameId }) {
  const dispatch = useDispatch();

  const handleAdd = async () => {
    try {
      await dispatch(addWordSetToDictionary(gameId));
      dispatch(
        setSnackbar({
          text: 'Слова из набора добавлены в словарь'
        })
      );
      dispatch(resetWordPairsActuality());
    } catch (error) {
      dispatch(setSnackbar({ text: 'Не удалось добавить слова' }));
    }
  };

  return (
    <Dialog
      aria-labelledby="word-set-pairs-add-dialog"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="word-set-pairs-add-dialog">Добавление слов</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Добавить все слова из темы в словарь?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          Отменить
        </Button>
        <Button
          variant="text"
          color="primary"
          onClick={() => {
            handleAdd();
            handleClose();
          }}
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

WordSetPairsAddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  gameId: PropTypes.number.isRequired
};

export default WordSetPairsAddDialog;
