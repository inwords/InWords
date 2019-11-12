import { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import DrawerContent from './DrawerContent';

const drawerWidth = 240;

const drawerBase = css`
  width: ${drawerWidth}px;
`;

const PermanentDrawer = styled(Drawer)`
  ${drawerBase}
  ${props => props.theme.breakpoints.down('md')} {
    display: none;
  }
`;

const CustomSwipeableDrawer = styled(SwipeableDrawer)`
  ${drawerBase}
  ${props => props.theme.breakpoints.up('lg')} {
    display: none;
  }
`;

const paperProps = { style: { width: drawerWidth } };

function Drawers({ sideRoutes, open, handleOpen, handleClose }) {
  return (
    <Fragment>
      <PermanentDrawer variant="permanent" PaperProps={paperProps}>
        <DrawerContent sideRoutes={sideRoutes} />
      </PermanentDrawer>
      <CustomSwipeableDrawer
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        PaperProps={paperProps}
      >
        <DrawerContent sideRoutes={sideRoutes} />
      </CustomSwipeableDrawer>
    </Fragment>
  );
}

Drawers.propTypes = {
  sideRoutes: PropTypes.array,
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default Drawers;
