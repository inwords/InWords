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
import useDialog from '../../../hooks/useDialog';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function WordPairAddDialog({
  visible,
  inputs,
  handleChange,
  handleSubmit,
  handleReset,
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
        <Fab color="primary" onClick={handleOpen} className={classes.fab}>
          <AddIcon />
        </Fab>
      </Zoom>
      <Dialog
        aria-labelledby="word-pair-add-dialog"
        fullScreen={fullScreen}
        open={open}
        onClose={handleCloseExtended}
      >
        <DialogTitle id="word-pair-add-dialog">Добавление слова</DialogTitle>
        <DialogContent>
          <form id="word-pair-add-form" onSubmit={handleSubmitExtended}>
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
          <Button color="primary" type="submit" form="word-pair-add-form">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

WordPairAddDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  inputs: PropTypes.shape({
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default WordPairAddDialog;
