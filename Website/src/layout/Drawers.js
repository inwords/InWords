import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import BrandLink from 'src/layout/BrandLink';
import SideNavList from 'src/layout/SideNavList';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth
  },
  permanentDrawer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  swipableDrawer: {
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    height: theme.spacing(8)
  },
  drawerBrandLink: {
    paddingLeft: theme.spacing(3)
  }
}));

function Drawers({ sideRoutes, open, handleOpen, handleClose }) {
  const classes = useStyles();

  return (
    <>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, classes.permanentDrawer)}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}></div>
        <Divider />
        <nav role="navigation">
          <SideNavList sideRoutes={sideRoutes} />
        </nav>
      </Drawer>
      <SwipeableDrawer
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        className={clsx(classes.drawer, classes.swipableDrawer)}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <BrandLink className={classes.drawerBrandLink} />
        </div>
        <Divider />
        <nav role="navigation">
          <SideNavList sideRoutes={sideRoutes} />
        </nav>
      </SwipeableDrawer>
    </>
  );
}

Drawers.propTypes = {
  sideRoutes: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default Drawers;
