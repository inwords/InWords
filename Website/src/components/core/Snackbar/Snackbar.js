import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ClickAwayListener from 'src/components/core/ClickAwayListener';
import Fade from 'src/components/core/Fade';
import Paper from 'src/components/core/Paper';

import './Snackbar.scss';

function Snackbar({
  open = false,
  autoHideDuration,
  message,
  action,
  onClose,
  className,
  ...rest
}) {
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    if (open && autoHideDuration) {
      let timer = setTimeout(() => {
        setHidden(true);

        if (onClose) {
          onClose();
          setHidden(false);
        }
      }, autoHideDuration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [open, autoHideDuration, onClose]);

  const actuallyOpen = open && !hidden;

  return (
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
  );
}

Snackbar.propTypes = {
  open: PropTypes.bool,
  autoHideDuration: PropTypes.number,
  message: PropTypes.node,
  action: PropTypes.node,
  onClose: PropTypes.func
};

export default Snackbar;
