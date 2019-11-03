import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => {
  return {
    root: {
      position: 'fixed',
      top: 0,
      left: 'auto',
      right: 0,
      zIndex: 1201,
      width: '100%',
      opacity: 0,
      transform: 'translateY(-100%)',
      transition: 'transform .3s cubic-bezier(.4, 0, .6, 1), opacity 0s .3s'
    },
    show: {
      opacity: 1,
      transform: 'translateY(0)',
      transition: 'transform .3s cubic-bezier(.4, 0, .2, 1) .3s, opacity 0s .3s'
    },
    primary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  };
});

function DynamicToolbarWrapper({
  children,
  show,
  primary = false,
  className,
  ...rest
}) {
  const classes = useStyles();

  return (
    <Paper
      elevation={4}
      square
      className={clsx(classes.root, className, {
        [classes.show]: show,
        [classes.primary]: primary
      })}
      {...rest}
    >
      {children}
    </Paper>
  );
}

DynamicToolbarWrapper.propTypes = {
  show: PropTypes.bool,
  primary: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default DynamicToolbarWrapper;
