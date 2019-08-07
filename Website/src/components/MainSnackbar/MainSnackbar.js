import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(theme => ({
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: 90,
    },
  },
}));

function MainSnackbar({ open, message, handleClose }) {
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      message={<span>{message}</span>}
      className={clsx({
        [classes.snackbar]: document.getElementById('fab')
      })}
    />
  );
}

MainSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string,
  handleClose: PropTypes.func.isRequired
};

export default MainSnackbar;
