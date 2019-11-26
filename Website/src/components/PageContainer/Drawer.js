import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles';
import styled from '@emotion/styled';

const Drawer = styled.nav`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: ${props => props.theme.zIndex.drawer};
  overflow-y: auto;
  width: 240px;
  border-right: 1px solid ${props => fade(props.theme.palette.divider, 0.08)};
  background-color: ${props => props.theme.palette.background.paper};
  transform: ${props => (props.open ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.2s ease-in-out;

  ${props => props.theme.breakpoints.up('lg')} {
    display: none;
  }
`;

Drawer.propTypes = {
  open: PropTypes.bool
};

export default Drawer;
