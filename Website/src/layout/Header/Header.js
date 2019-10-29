import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

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
    alignItems: 'stretch',
    height: theme.spacing(8),
    padding: theme.spacing(0, 2),
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(13)
    }
  },
  brandLink: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: 'inherit',
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(8)
    }
  },
  nav: {
    marginLeft: 'auto',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      left: 0,
      top: theme.spacing(7),
      right: 0
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
    lineHeight: '48px',
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

function Header() {
  const classes = useStyles();

  const [show, setShow] = React.useState(true);
  const prevScrollYRef = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      if (prevScrollYRef.current > currentScrollY) {
        if (!show) {
          setShow(true);
        }
      } else {
        if (show && currentScrollY > 64) {
          setShow(false);
        }
      }

      prevScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [show]);

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.header, {
        [classes.headerShow]: show
      })}
    >
      <div className={classes.toolbar}>
        <RouterLink
          to="/"
          variant="h6"
          underline="none"
          color="inherit"
          className={classes.brandLink}
        >
          InWords
        </RouterLink>
        <nav className={classes.nav}>
          <ul className={classes.navList}>
            <li className={classes.navItem}>
              <NavLink
                to="/signIn"
                variant="h6"
                underline="none"
                color="inherit"
                className={classes.navLink}
                activeClassName={classes.activeNavLink}
              >
                Вход
              </NavLink>
            </li>
            <li className={classes.navItem}>
              <NavLink
                to="/signUp"
                variant="h6"
                underline="none"
                color="inherit"
                className={classes.navLink}
                activeClassName={classes.activeNavLink}
              >
                Регистрация
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </AppBar>
  );
}

Header.propTypes = {};

export default Header;
