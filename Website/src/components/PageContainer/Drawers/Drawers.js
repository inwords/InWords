import PropTypes from 'prop-types';
import styled from '@emotion/styled';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import DrawerContent from './DrawerContent';

const drawerWidth = 240;

const drawerBase = css`
  width: ${drawerWidth}px;

  & .MuiPaper-root {
    width: ${drawerWidth}px;
  }
`;

const CustomSwipeableDrawer = styled(SwipeableDrawer)`
  ${drawerBase}
  ${props => props.theme.breakpoints.up('md')} {
    display: none;
  }
`;

function Drawers({ routes, open, handleOpen, handleClose }) {
  return (
    <CustomSwipeableDrawer
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
    >
      <DrawerContent handleClose={handleClose} routes={routes} />
    </CustomSwipeableDrawer>
  );
}

Drawers.propTypes = {
  routes: PropTypes.array,
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default Drawers;
