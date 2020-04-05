import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ClickAwayListener from 'src/components/core/ClickAwayListener';
import Fade from 'src/components/core/Fade';
import Paper from 'src/components/core/Paper';

import './Snackbar.scss';

function Snackbar({
  open = false,
  autoHideDuration = 5000,
  message,
  action,
  onClose,
  className,
  ...rest
}) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (open && autoHideDuration) {
      let timerId = setTimeout(() => {
        setHidden(true);

        if (onClose) {
          onClose();
          setHidden(false);
        }
      }, autoHideDuration);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [open, autoHideDuration, onClose]);

  const actuallyOpen = open && !hidden;

  return (
    <div className="snackbar-container">
      <ClickAwayListener
        active={actuallyOpen}
        onClickAway={actuallyOpen ? onClose : undefined}
      >
        <Fade in={actuallyOpen}>
          <Paper
            depthShadow={16}
            className={classNames('snackbar', className)}
            {...rest}
          >
            {message && <div className="snackbar__message">{message}</div>}
            {action && <div className="snackbar__action">{action}</div>}
          </Paper>
        </Fade>
      </ClickAwayListener>
    </div>
  );
}

Snackbar.propTypes = {
  open: PropTypes.bool,
  autoHideDuration: PropTypes.number,
  message: PropTypes.node,
  action: PropTypes.node,
  onClose: PropTypes.func,
  className: PropTypes.string
};

export default Snackbar;
