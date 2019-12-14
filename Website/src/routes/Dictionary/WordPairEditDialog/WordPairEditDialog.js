import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from 'src/components/Dialog';
import DialogTitle from 'src/components/DialogTitle';
import DialogContent from 'src/components/DialogContent';
import DialogActions from 'src/components/DialogActions';

function WordPairEditDialog({
  open,
  handleClose,
  inputs,
  handleChange,
  handleSubmit,
  handleReset
}) {
  return (
    <Dialog
      aria-labelledby="word-pair-edit-dialog"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="word-pair-edit-dialog">Редактирование слова</DialogTitle>
      <DialogContent>
        <form
          id="word-pair-edit-form"
          onSubmit={event => {
            handleSubmit(event);
            handleClose();
          }}
        >
          <TextField
            id="word-foreign"
            label="Слово или фраза на английском"
            name="wordForeign"
            value={inputs.wordForeign}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <TextField
            id="word-native"
            label="Перевод"
            name="wordNative"
            value={inputs.wordNative}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button type="submit" form="word-pair-edit-form" color="primary">
          Готово
        </Button>
      </DialogActions>
    </Dialog>
  );
}

WordPairEditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  inputs: PropTypes.exact({
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default WordPairEditDialog;
