import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'src/components/core/Dialog';
import DialogTitle from 'src/components/core/DialogTitle';
import DialogContent from 'src/components/core/DialogContent';
import DialogActions from 'src/components/core/DialogActions';
import FormGroup from 'src/components/core/FormGroup';
import TextField from 'src/components/core/TextField';
import Button from 'src/components/core/Button';

function WordPairEditDialog({
  open,
  handleClose,
  inputs,
  handleChange,
  handleSubmit
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
          <FormGroup>
            <TextField
              id="word-foreign"
              placeholder="Слово или фраза на английском"
              name="wordForeign"
              value={inputs.wordForeign}
              onChange={handleChange}
              fullWidth
            />
          </FormGroup>
          <FormGroup>
            <TextField
              id="word-native"
              placeholder="Перевод"
              name="wordNative"
              value={inputs.wordNative}
              onChange={handleChange}
              fullWidth
            />
          </FormGroup>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          Отмена
        </Button>
        <Button
          type="submit"
          form="word-pair-edit-form"
          variant="text"
          color="primary"
        >
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
