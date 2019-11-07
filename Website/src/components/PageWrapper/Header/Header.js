import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BrandLink from 'src/components/BrandLink';
import DynamicAppBar from 'src/components/DynamicAppBar';
import MainMavList from './MainNavList';
import Progress from './Progress';

const useStyles = makeStyles(theme => ({
  context: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: theme.spacing(0, 3)
  },
  contextBlock: {
    display: 'flex',
    alignItems: 'center',
    height: theme.spacing(8)
  },
  contextBlockRight: {
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
      order: 1,
      width: '100%',
      height: theme.spacing(6)
    }
  }
}));

function Header({ mainRoutes, rightNodes, handleOpenDrawer }) {
  const classes = useStyles();

  return (
    <DynamicAppBar component="header" primary>
      <div className={classes.context}>
        <div className={classes.contextBlock}>
          {handleOpenDrawer && (
            <IconButton
              aria-label="side-nav-menu"
              onClick={handleOpenDrawer}
              edge="start"
              color="inherit"
              className={classes.navMenuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
          <BrandLink />
        </div>
        {mainRoutes && (
          <nav className={classes.nav} role="navigation">
            <MainMavList mainRoutes={mainRoutes} />
          </nav>
        )}
        {rightNodes && (
          <div
            className={clsx(classes.contextBlock, classes.contextBlockRight)}
          >
            {rightNodes}
          </div>
        )}
      </div>
      <Progress />
    </DynamicAppBar>
  );
}

Header.propTypes = {
  mainRoutes: PropTypes.arrayOf(
    PropTypes.exact({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ),
  rightNodes: PropTypes.arrayOf(PropTypes.node.isRequired),
  handleOpenDrawer: PropTypes.func
};

export default Header;
