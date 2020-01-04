import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Backdrop from 'src/components/Backdrop';

import './Modal.css';

function Modal({
  open,
  keepMounted = false,
  handleBackdropClick,
  transitionDuration,
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
      }, transitionDuration);
    }
  }, [open, transitionDuration]);

  if (!keepMounted && !open && exited) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={classNames('modal', className)}
      style={{
        visibility: exited ? 'hidden' : 'visible'
      }}
      {...rest}
    >
      <Backdrop
        open={open}
        onClick={handleBackdropClick}
        transitionDuration={transitionDuration}
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
  transitionDuration: PropTypes.number,
  children: PropTypes.node
};

export default Modal;
