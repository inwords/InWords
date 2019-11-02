import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BrandLink from 'src/layout/BrandLink';
import MainMavList from 'src/layout/MainNavList';

const useStyles = makeStyles(theme => ({
  header: {
    zIndex: 1201,
    opacity: 0,
    transform: 'translateY(-100%)',
    transition: 'transform .3s cubic-bezier(.4, 0, .6, 1), opacity 0s .3s'
  },
  headerShow: {
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'transform .3s cubic-bezier(.4, 0, .2, 1) .3s, opacity 0s .3s'
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: theme.spacing(0, 3)
  },
  toolbarBlock: {
    display: 'flex',
    alignItems: 'center',
    height: theme.spacing(8)
  },
  toolbarBlockRight: {
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 'auto'
    }
  },
  navMenuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  nav: {
    marginLeft: 'auto',
    display: 'flex',
    overflow: 'hidden',
    height: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      order: 1,
      width: '100%',
      height: theme.spacing(6)
    }
  }
}));

function Header({ show, mainRoutes, rightNodes, handleOpenDrawer }) {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.header, {
        [classes.headerShow]: show
      })}
    >
      <div className={classes.toolbar}>
        <div className={classes.toolbarBlock}>
          {handleOpenDrawer && (
            <IconButton
              edge="start"
              color="inherit"
              className={classes.navMenuButton}
              onClick={handleOpenDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
          <BrandLink />
        </div>
        <nav className={classes.nav} role="navigation">
          <MainMavList mainRoutes={mainRoutes} />
        </nav>
        {rightNodes && (
          <div
            className={clsx(classes.toolbarBlock, classes.toolbarBlockRight)}
          >
            {rightNodes}
          </div>
        )}
      </div>
    </AppBar>
  );
}

Header.propTypes = {
  show: PropTypes.bool.isRequired,
  mainRoutes: PropTypes.array,
  rightNodes: PropTypes.arrayOf(PropTypes.node.isRequired),
  handleOpenDrawer: PropTypes.func
};

export default Header;
