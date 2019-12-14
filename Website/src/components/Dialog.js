import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import Modal from 'src/components/Modal';
import Paper from 'src/components/Paper';

const transitionDuration = {
  enter: 0,
  exit: 150
};

const DialogContainer = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'open'
})`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  opacity: ${props => (props.open ? 1 : 0)};
  transition-property: opacity;
  transition-duration: ${props =>
    transitionDuration[props.open ? 'enter' : 'exit']}ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;

const DialogPaper = styled(Paper)`
  display: flex;
  min-width: 400px;
  max-width: 600px;
  max-height: calc(100% - 64px);
  flex-direction: column;

  ${props => props.theme.breakpoints.down('sm')} {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: none;
  }
`;

function Dialog({ open, onClose, ...rest }) {
  const dialogPaperRef = React.useRef();

  return (
    <Modal
      open={open}
      onClick={onClose}
      transitionDuration={transitionDuration[open ? 'enter' : 'exit']}
    >
      <DialogContainer open={open}>
        <DialogPaper
          onClick={event => {
            event.stopPropagation();
          }}
          ref={dialogPaperRef}
          elevation={24}
          {...rest}
        />
      </DialogContainer>
    </Modal>
  );
}

Dialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default Dialog;
