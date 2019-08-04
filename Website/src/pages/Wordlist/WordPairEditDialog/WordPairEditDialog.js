import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useDialog from 'hooks/useDialog';

function WordPairEditDialog({
  inputs,
  handleChange,
  handleSubmit,
  handleReset,
  visible,
}) {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { open, handleOpen, handleClose } = useDialog();

  const handleCloseExtended = () => {
    handleClose();
    handleReset();
  };

  const handleSubmitExtended = event => {
    handleSubmit(event);
    handleCloseExtended();
  };

  return (
    <Box display={visible ? 'block' : 'none'}>
      <IconButton edge="end" aria-label="Edit" onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        aria-labelledby="word-pair-edit-dialog"
        fullScreen={fullScreen}
        open={open}
        onClose={handleCloseExtended}
      >
        <DialogTitle id="word-pair-edit-dialog">
          Редактирование слова
        </DialogTitle>
        <DialogContent>
          <form id="word-pair-edit-form" onSubmit={handleSubmitExtended}>
            <TextField
              margin="normal"
              fullWidth
              label="Слово или фраза"
              autoFocus
              name="wordForeign"
              value={inputs.wordForeign}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Перевод"
              name="wordNative"
              value={inputs.wordNative}
              onChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseExtended}>Отмена</Button>
          <Button color="primary" type="submit" form="word-pair-edit-form">
            Готово
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

WordPairEditDialog.propTypes = {
  inputs: PropTypes.shape({
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default WordPairEditDialog;
