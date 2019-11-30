import React from 'react';
import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import Modal from 'src/components/Modal';

const transitionDuration = {
  enter: 225,
  exit: 150
};

const DrawerPaper = styled('nav', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'open'
})`
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
  transition-property: transform;
  transition-duration: ${props =>
    transitionDuration[props.open ? 'enter' : 'exit']}ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  ${props => props.theme.breakpoints.up('lg')} {
    display: none;
  }
`;

function Drawer({ open, onClose, ...rest }) {
  return (
    <Modal
      open={open}
      handleBackdropClick={onClose}
      keepMounted
      BackdropProps={{
        transitionDuration: transitionDuration[open ? 'enter' : 'exit']
      }}
    >
      <DrawerPaper open={open} {...rest} />
    </Modal>
  );
}

Drawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default Drawer;
