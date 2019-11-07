import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import BrandLink from 'src/components/BrandLink';
import SideNavList from 'src/components/PageWrapper/Drawers/SideNavList';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    width: drawerWidth
  },
  permanent: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  swipable: {
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  paper: {
    width: drawerWidth
  },
  header: {
    height: theme.spacing(8)
  },
  brandLink: {
    paddingLeft: theme.spacing(3)
  }
}));

function Drawers({ sideRoutes, open, handleOpen, handleClose }) {
  const classes = useStyles();

  return (
    <>
      <Drawer
        variant="permanent"
        className={clsx(classes.root, classes.permanent)}
        classes={{
          paper: classes.paper
        }}
      >
        <div className={classes.header}></div>
        <Divider />
        <nav role="navigation">
          <SideNavList sideRoutes={sideRoutes} />
        </nav>
      </Drawer>
      <SwipeableDrawer
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        className={clsx(classes.root, classes.swipable)}
        classes={{
          paper: classes.paper
        }}
      >
        <div className={classes.header}>
          <BrandLink className={classes.brandLink} />
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
