import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Progress from './Progress';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import ProfileMenu from './ProfileMenu';
import NavList from './NavList';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  spacer: {
    flex: '1 1 100%'
  },
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(3),
    ...theme.mixins.toolbar
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3, 0, 0)
  },
}));

function PageLayout({ authorized, children }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            aria-label="toggle drawer"
            onClick={handleToggle}
            color="inherit"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" variant="h6" underline="none" color="inherit">
            InWords
          </Link>
          <span className={classes.spacer}></span>
          {authorized && <ProfileMenu />}
        </Toolbar>
        <Progress />
      </AppBar>
      <nav aria-label="main navigation">
        <Hidden lgUp>
          <SwipeableDrawer
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            className={classes.drawer}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <Link href="/" variant="h6" underline="none">
                InWords
              </Link>
            </div>
            <Divider />
            <NavList authorized={authorized} onClick={handleClose} />
          </SwipeableDrawer>
        </Hidden>
        <Hidden mdDown>
          <Drawer
            open
            className={classes.drawer}
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
          >
            <div className={classes.toolbar} />
            <Divider />
            <NavList authorized={authorized} />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

PageLayout.propTypes = {
  authorized: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default PageLayout;
