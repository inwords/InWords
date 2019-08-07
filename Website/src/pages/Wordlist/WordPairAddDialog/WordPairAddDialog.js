import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useDialog from 'hooks/useDialog';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

function WordPairAddDialog({
  inputs,
  handleChange,
  handleSubmit,
  handleReset,
  visible
}) {
  const classes = useStyles();
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
    <div>
      <Zoom in={visible}>
        <Fab
          id="fab"
          aria-label="add"
          onClick={handleOpen}
          color="primary"
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
      </Zoom>
      <Dialog
        aria-labelledby="word-pair-add-dialog"
        open={open}
        onClose={handleCloseExtended}
        fullScreen={fullScreen}
      >
        <DialogTitle id="word-pair-add-dialog">Добавление слова</DialogTitle>
        <DialogContent>
          <form id="word-pair-add-form" onSubmit={handleSubmitExtended}>
            <TextField
              label="Слово или фраза"
              name="wordForeign"
              value={inputs.wordForeign}
              onChange={handleChange}
              autoFocus
              margin="normal"
              fullWidth
            />
            <TextField
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
          <Button onClick={handleCloseExtended}>Отмена</Button>
          <Button type="submit" form="word-pair-add-form" color="primary">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

WordPairAddDialog.propTypes = {
  inputs: PropTypes.shape({
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};

export default WordPairAddDialog;
