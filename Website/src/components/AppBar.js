import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const AppBar = styled.header`
  position: fixed;
  top: 0;
  left: auto;
  right: 0;
  z-index: 1201;
  width: 100%;
  transform: ${props => (!props.show ? 'translateY(-100%)' : 'translateY(0)')};
  transition: ${props =>
    !props.show
      ? 'transform .3s cubic-bezier(.4, 0, .2, 1), opacity 0s .3s'
      : 'transform .3s cubic-bezier(.4, 0, .6, 1) .3s'};
  background-color: ${props =>
    props.primary
      ? props.theme.palette.primary.main
      : props.theme.palette.background.paper};
  color: ${props =>
    props.primary ? props.theme.palette.primary.contrastText : 'inherit'};
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    opacity: ${props => (!props.show ? 0 : 1)};
    box-shadow: ${props => props.theme.shadows[4]};
    transition: opacity 0.3s 0.3s;
  }
`;

AppBar.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node
};

export default AppBar;
