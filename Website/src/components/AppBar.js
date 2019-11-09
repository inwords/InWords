import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    root: {
      position: 'fixed',
      top: 0,
      left: 'auto',
      right: 0,
      zIndex: 1201,
      width: '100%',
      transform: 'translateY(-100%)',
      transition: 'transform .3s cubic-bezier(.4, 0, .2, 1), opacity 0s .3s',
      backgroundColor: theme.palette.background.paper,
      '&::after': {
        content: "''",
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -1,
        opacity: 0,
        boxShadow: theme.shadows[4],
        transition: 'opacity .3s .3s'
      }
    },
    show: {
      transform: 'translateY(0)',
      transition: 'transform .3s cubic-bezier(.4, 0, .6, 1) .3s',
      '&::after': {
        opacity: 1
      }
    },
    primary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  };
});

function AppBar({
  component = 'header',
  children,
  show,
  primary = false,
  className,
  ...rest
}) {
  const classes = useStyles();

  const Component = component;

  return (
    <Component
      className={clsx(classes.root, className, {
        [classes.show]: show,
        [classes.primary]: primary
      })}
      {...rest}
    >
      {children}
    </Component>
  );
}

AppBar.propTypes = {
  component: PropTypes.elementType,
  show: PropTypes.bool,
  primary: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default AppBar;
