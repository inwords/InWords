import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { resetSnackbar } from 'src/actions/commonActions';
import usePrevious from 'src/components/core/usePrevious';
import Snackbar from 'src/components/core/Snackbar';
import Button from 'src/components/core/Button';

function SmartSnackbar() {
  const { open, text, actionText, handleAction = () => {} } = useSelector(
    store => store.common.snackbar
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(resetSnackbar());
  };

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

export default SmartSnackbar;
