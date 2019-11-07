import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  navList: {
    margin: 0,
    display: 'flex',
    justifyContent: 'space-around',
    padding: 0,
    listStyle: 'none',
    width: '100%',
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

function MainNavList({ show, mainRoutes, handleOpenDrawer }) {
  const classes = useStyles();

  return (
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
  );
}

MainNavList.propTypes = {
  mainRoutes: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default MainNavList;
