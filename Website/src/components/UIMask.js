import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const UIMask = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  opacity: ${props => (props.show ? '1' : '0')};
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.5);
  opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

UIMask.propTypes = {
  open: PropTypes.bool
};

export default UIMask;
