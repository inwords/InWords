import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import useDrawer from 'hooks/useDrawer';
import ProfileMenu from './ProfileMenu';
import NavList from './NavList';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('lg')]: {
      transform: 'rotate(360deg)',
    },
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp,
    }),
  },
  space: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 3),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3, 0),
    [theme.breakpoints.up('lg')]: {
      marginLeft: -drawerWidth,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  contentShift: {
    [theme.breakpoints.up('lg')]: {
      marginLeft: 0,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
  toolbar: theme.mixins.toolbar,
}));

function PageLayout({ authorized, loading, children }) {
  const classes = useStyles();

  const { open, handleOpen, handleClose, handleToggle } = useDrawer();

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
            color="inherit"
            aria-label="Open drawer"
            onClick={handleToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Link color="inherit" href="/" variant="h6" underline="none">
            InWords
          </Link>
          <span className={classes.space}></span>
          {authorized && <ProfileMenu />}
        </Toolbar>
        {loading && <LinearProgress />}
      </AppBar>
      <Hidden lgUp>
        <SwipeableDrawer
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawerHeader}
          <Divider />
          <NavList authorized={authorized} onClick={handleClose} />
        </SwipeableDrawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          variant="persistent"
          open={open}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawerHeader}
          <Divider />
          <NavList authorized={authorized} />
        </Drawer>
      </Hidden>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
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
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default PageLayout;
