import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import usePrevious from 'hooks/usePrevious';

const useStyles = makeStyles(theme => ({
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: 90
    }
  }
}));

function MainSnackbar({ open, text, actionText, handleAction, handleClose }) {
  const classes = useStyles();

  const prevText = usePrevious(text);
  const prevActionText = usePrevious(actionText);

  let action;
  if (open) {
    action = actionText && (
      <Button color="secondary" size="small" onClick={handleAction}>
        {actionText}
      </Button>
    );
  } else {
    action = prevActionText && (
      <Button color="secondary" size="small">
        {prevActionText}
      </Button>
    );
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message={<span>{open ? text : prevText}</span>}
      action={action}
      className={clsx({
        [classes.snackbar]: document.getElementById('fab')
      })}
    />
  );
}

MainSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  handleAction: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default MainSnackbar;
