import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Fade from 'src/components/core/Fade';

import './Modal.scss';

const transitionDurations = {
  enter: 'var(--transition-duration-entering-screen)',
  exit: 'var(--transition-duration-leaving-screen)'
};

function Modal({
  open,
  keepMounted = false,
  children,
  onTransitionEnd,
  className,
  ...rest
}) {
  const [exited, setExited] = React.useState(true);
  const [exitStarted, setExitStarted] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setExited(false);
      setExitStarted(false);
    } else {
      setExitStarted(true);
    }
  }, [open]);

  const handleTransitionEnd = event => {
    if (exitStarted) {
      setExited(true);
    }

    if (onTransitionEnd) {
      onTransitionEnd(event);
    }
  };

  if (!keepMounted && exited) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={classNames('modal', className)}
      style={{
        visibility: exited ? 'hidden' : undefined
      }}
      {...rest}
    >
      <Fade
        in={open}
        transitionDurations={transitionDurations}
        transitionTimingFunction="linear"
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="modal__backdrop" />
      </Fade>
      {children}
    </div>,
    document.body
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  keepMounted: PropTypes.bool,
  children: PropTypes.node,
  onTransitionEnd: PropTypes.func,
  className: PropTypes.string
};

export default Modal;
