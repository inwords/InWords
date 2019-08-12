import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import useDialog from 'hooks/useDialog';
import WordPairAddDialog from './WordPairAddDialog';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

function WordPairAddButton({ visible }) {
  const classes = useStyles();

  const { open, handleOpen, handleClose } = useDialog();

  return (
    <>
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
      <WordPairAddDialog open={open} handleClose={handleClose} />
    </>
  );
}

WordPairAddButton.propTypes = {
  visible: PropTypes.bool.isRequired
};

export default WordPairAddButton;
