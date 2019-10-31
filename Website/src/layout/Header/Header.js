import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
    alignItems: 'center',
    padding: theme.spacing(0, 3),
    [theme.breakpoints.down('sm')]: {
      alignItems: 'start',
      flexDirection: 'column'
    }
  },
  toolbarBlock: {
    display: 'flex',
    alignItems: 'center',
    height: theme.spacing(8)
  },
  menuIcon: {
    marginRight: theme.spacing(2)
  },
  brandLink: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    fontSize: '1rem',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: 'inherit'
  },
  nav: {
    marginLeft: 'auto',
    overflow: 'hidden',
    height: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: theme.spacing(6)
    }
  },
  navList: {
    margin: 0,
    display: 'flex',
    justifyContent: 'space-around',
    padding: 0,
    listStyle: 'none',
    height: '100%'
  },
  navItem: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    height: '100%'
  },
  navLink: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: '0 14px',
    fontSize: '1rem',
    height: '100%',
    textDecoration: 'none',
    color: theme.palette.grey[400],
    transition: 'color .1s cubic-bezier(.4, 0, .2, 1)',
    '&:hover': {
      color: theme.palette.primary.contrastText
    },
    '&::after': {
      content: "''",
      position: 'absolute',
      bottom: 0,
      left: 14,
      right: 14,
      height: '4px',
      backgroundColor: theme.palette.primary.contrastText,
      transform: 'scaleY(0)',
      transition: 'transform 235ms cubic-bezier(.4, 0, .2, 1)'
    }
  },
  activeNavLink: {
    color: theme.palette.primary.contrastText,
    '&::after': {
      transform: 'scaleY(1)'
    }
  }
}));

function Header({ show, mainRoutes, handleOpenDrawer }) {
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
              className={classes.menuIcon}
              onClick={handleOpenDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
          <RouterLink
            to="/"
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.brandLink}
          >
            InWords
          </RouterLink>
        </div>
        <nav className={classes.nav}>
          <ul className={classes.navList}>
            {mainRoutes.map(({ to, text }) => (
              <li key={to} className={classes.navItem}>
                <NavLink
                  to={to}
                  variant="h6"
                  underline="none"
                  color="inherit"
                  className={classes.navLink}
                  activeClassName={classes.activeNavLink}
                >
                  {text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </AppBar>
  );
}

Header.propTypes = {
  show: PropTypes.bool.isRequired,
  mainRoutes: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ),
  handleOpenDrawer: PropTypes.func
};

export default Header;
