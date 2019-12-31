import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const AppBar = styled.header`
  position: fixed;
  top: 0;
  left: auto;
  right: 0;
  z-index: ${props => props.theme.zIndex.appBar};
  width: 100%;
  background-color: ${props => props.theme.palette.primary.main};
  color: ${props => props.theme.palette.primary.contrastText};

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    box-shadow: ${props => props.theme.shadows[4]};
  }
`;

AppBar.propTypes = {
  children: PropTypes.node
};

export default AppBar;
