import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Fade from 'src/components/core/Fade';

import './Modal.scss';

const transitionDurations = {
  enter: 225,
  exit: 150
};

function Modal({ open, keepMounted = false, children, className, ...rest }) {
  const [exited, setExited] = React.useState(true);

  React.useEffect(() => {
    if (open) {
      setExited(false);
    } else {
      let timer = setTimeout(() => {
        setExited(true);
      }, transitionDurations.exit);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [open]);

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
  className: PropTypes.string
};

export default Modal;
