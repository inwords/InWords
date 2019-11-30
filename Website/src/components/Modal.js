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
  BackdropProps,
  ...rest
}) {
  const [exited, setExited] = React.useState(true);

  React.useEffect(() => {
    if (open) {
      setExited(false);
    }
  }, [open]);

  const handleTransition = () => {
    if (!open) {
      setExited(true);
    }
  };

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
        onTransitionEnd={handleTransition}
        {...BackdropProps}
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
  BackdropProps: PropTypes.shape({
    transitionDuration: PropTypes.number
  })
};

export default Modal;
