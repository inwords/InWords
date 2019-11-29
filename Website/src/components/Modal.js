import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ModalRoot = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${props => props.theme.zIndex.modal};
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
`;

function Modal(props) {
  return ReactDOM.createPortal(<ModalRoot {...props} />, document.body);
}

Modal.propTypes = {
  show: PropTypes.bool
};

export default Modal;
