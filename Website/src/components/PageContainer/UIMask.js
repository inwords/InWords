import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const UIMask = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${props => (props.show ? props.theme.zIndex.drawer - 1 : 0)};
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  opacity: ${props => (props.show ? '1' : '0')};
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.2s linear;
`;

UIMask.propTypes = {
  open: PropTypes.bool
};

export default UIMask;
