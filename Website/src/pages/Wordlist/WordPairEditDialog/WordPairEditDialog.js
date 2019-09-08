import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function WordPairEditDialog({
  open,
  handleClose,
  inputs,
  handleChange,
  handleSubmit,
  handleReset
}) {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCloseWithReset = () => {
    handleClose();
    handleReset();
  };

  return (
    <Dialog
      aria-labelledby="word-pair-edit-dialog"
      open={open}
      onClose={handleCloseWithReset}
      fullScreen={fullScreen}
    >
      <DialogTitle id="word-pair-edit-dialog">Редактирование слова</DialogTitle>
      <DialogContent>
        <form
          id="word-pair-edit-form"
          onSubmit={event => {
            handleSubmit(event);
            handleCloseWithReset();
          }}
        >
          <TextField
            id="word-foreign"
            label="Слово или фраза"
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
        <Button onClick={handleCloseWithReset}>Отмена</Button>
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
  inputs: PropTypes.shape({
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired
};

export default WordPairEditDialog;
