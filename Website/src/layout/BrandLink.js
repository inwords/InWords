import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  brandLink: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    fontSize: '1rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: 'inherit'
  }
}));

function BrandLink({ className }) {
  const classes = useStyles();

  return (
    <RouterLink
      to="/"
      variant="h6"
      underline="none"
      color="inherit"
      className={clsx(classes.brandLink, className)}
    >
      InWords
    </RouterLink>
  );
}

BrandLink.propTypes = {
  className: PropTypes.string
};

export default BrandLink;
