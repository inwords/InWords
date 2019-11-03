import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useScrollShow from 'src/hooks/useScrollShow';
import BrandLink from 'src/layout/BrandLink';
import MainMavList from 'src/layout/MainNavList';
import DynamicWrapper from 'src/components/DynamicWrapper';
import Progress from 'src/components/Progress';

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

function Header({ mainRoutes, rightNodes, handleOpenDrawer }) {
  const classes = useStyles();
  const show = useScrollShow(true, 64);

  return (
    <DynamicWrapper component="header" show={show} primary>
      <div className={classes.context}>
        <div className={classes.contextBlock}>
          {handleOpenDrawer && (
            <IconButton
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
        <nav className={classes.nav} role="navigation">
          <MainMavList mainRoutes={mainRoutes} />
        </nav>
        {rightNodes && (
          <div
            className={clsx(classes.contextBlock, classes.contextBlockRight)}
          >
            {rightNodes}
          </div>
        )}
      </div>
      <Progress />
    </DynamicWrapper>
  );
}

Header.propTypes = {
  mainRoutes: PropTypes.array,
  rightNodes: PropTypes.arrayOf(PropTypes.node.isRequired),
  handleOpenDrawer: PropTypes.func
};

export default Header;
