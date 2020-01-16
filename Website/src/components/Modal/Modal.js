import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Modal.scss';

const transitionDuration = {
  enter: 225,
  exit: 150
};

function Modal({
  open,
  keepMounted = false,
  handleBackdropClick,
  children,
  className,
  ...rest
}) {
  const [exited, setExited] = React.useState(true);

  React.useEffect(() => {
    if (open) {
      setExited(false);
    } else {
      setTimeout(() => {
        setExited(true);
      }, 150);
    }
  }, [open]);

  if (!keepMounted && !open && exited) {
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
      <div
        onClick={handleBackdropClick}
        className={classNames('modal__backdrop', {
          'modal__backdrop--animated': !keepMounted
        })}
        style={{
          opacity: open ? 1 : 0,
          transition: `opacity ${
            transitionDuration[open ? 'enter' : 'exit']
          }ms linear`
        }}
      />
      {children}
    </div>,
    document.body
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  keepMounted: PropTypes.bool,
  handleBackdropClick: PropTypes.func,
  children: PropTypes.node
};

export default Modal;
