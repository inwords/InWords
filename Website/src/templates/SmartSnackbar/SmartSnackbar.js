import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Snackbar from 'src/components/Snackbar';
import Button from 'src/components/Button';
import usePrevious from 'src/hooks/usePrevious';

import './SmartSnackbar.scss';

function SmartSnackbar({ open, text, actionText, handleAction, handleClose }) {
  const prevText = usePrevious(text);
  const prevActionText = usePrevious(actionText);

  let action;
  if (open) {
    action = actionText && (
      <Button
        onClick={() => {
          handleAction();
          handleClose();
        }}
        variant="text"
      >
        {actionText}
      </Button>
    );
  } else {
    action = prevActionText && <Button variant="text">{prevActionText}</Button>;
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message={<span>{open ? text : prevText}</span>}
      action={action}
      className={classNames({
        /* Snackbar appears above, when page has FAB.
        DOM API is the simplest way for check */
        'smart-snackbar--above': Boolean(document.getElementById('fab'))
      })}
    />
  );
}

SmartSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  handleAction: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default SmartSnackbar;
