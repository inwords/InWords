import React, { Suspense, lazy, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import NavList from './NavList';

const ProfileMenu = lazy(() => import('./ProfileMenu'));

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
      transform: 'rotate(180deg)'
    },
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp
    })
  },
  space: {
    flexGrow: 1
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3, 0),
    [theme.breakpoints.up('lg')]: {
      marginLeft: -drawerWidth,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    }
  },
  contentShift: {
    [theme.breakpoints.up('lg')]: {
      marginLeft: 0,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  },
  toolbar: theme.mixins.toolbar
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

  const drawerHeader = (
    <div className={classes.drawerHeader}>
      <Link href="/" variant="h6" underline="none">
        InWords
      </Link>
    </div>
  );

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
          <span className={classes.space}></span>
          {authorized && (
            <Suspense
              fallback={
                <CircularProgress color="secondary" size={24} thickness={4} />
              }
            >
              <ProfileMenu />
            </Suspense>
          )}
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
            {drawerHeader}
            <Divider />
            <NavList authorized={authorized} onClick={handleClose} />
          </SwipeableDrawer>
        </Hidden>
        <Hidden mdDown>
          <Drawer
            open={open}
            className={classes.drawer}
            classes={{
              paper: classes.drawerPaper
            }}
            variant="persistent"
          >
            {drawerHeader}
            <Divider />
            <NavList authorized={authorized} />
          </Drawer>
        </Hidden>
      </nav>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
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
