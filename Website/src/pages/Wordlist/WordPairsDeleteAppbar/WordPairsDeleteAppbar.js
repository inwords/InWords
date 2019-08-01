import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 2,
  },
  closeButton: {
    marginRight: 20,
  },
  title: {
    flexGrow: 1,
  },
}));

function WordPairsDeleteAppbar({
  numberOfSelected,
  handleDelete,
  handleReset,
}) {
  const classes = useStyles();

  const handleDeleteExtended = () => {
    handleDelete();
    handleReset();
  };

  return (
    <Box display={numberOfSelected ? 'block' : 'none'}>
      <AppBar
        position="fixed"
        color="secondary"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Close"
            onClick={handleReset}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Выбрано: {numberOfSelected}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="Delete"
            onClick={handleDeleteExtended}
          >
            <DeleteIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

WordPairsDeleteAppbar.propTypes = {
  numberOfSelected: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
};

export default WordPairsDeleteAppbar;
