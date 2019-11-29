import React from 'react';
import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles';
import styled from '@emotion/styled';
import Modal from 'src/components/Modal';
import UIMask from 'src/components/UIMask';

const DrawerRoot = styled.nav`
  position: fixed;
  top: 0;
  right: auto;
  left: 0;
  height: 100%;
  z-index: ${props => props.theme.zIndex.drawer};
  overflow-y: auto;
  width: 240px;
  border-right: 1px solid ${props => fade(props.theme.palette.divider, 0.08)};
  background-color: ${props => props.theme.palette.background.paper};
  transform: ${props => (props.open ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;

  ${props => props.theme.breakpoints.up('lg')} {
    display: none;
  }
`;

function Drawer({ open, onClose, ...rest }) {
  const [exited, setExited] = React.useState(true);

  const handleTransition = () => {
    if (!open) {
      setExited(true);
    }
  };

  React.useEffect(() => {
    if (open) {
      setExited(false);
    }
  }, [open]);

  return (
    <Modal show={open || !exited}>
      <UIMask show={open} onClick={onClose} />
      <DrawerRoot onTransitionEnd={handleTransition} open={open} {...rest} />
    </Modal>
  );
}

Drawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default Drawer;
