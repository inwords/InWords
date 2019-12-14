import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Backdrop from 'src/components/Backdrop';

const ModalRoot = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${props => props.theme.zIndex.modal};
`;

function Modal({
  open,
  keepMounted = false,
  handleBackdropClick,
  children,
  transitionDuration,
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
    <ModalRoot
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
    </ModalRoot>,
    document.body
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  keepMounted: PropTypes.bool,
  handleBackdropClick: PropTypes.func,
  children: PropTypes.node,
  transitionDuration: PropTypes.number
};

export default Modal;
