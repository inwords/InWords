import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';

function MainSnackbar({ open, message, handleClose }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      message={<span>{message}</span>}
    />
  );
}

MainSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
};

export default MainSnackbar;
