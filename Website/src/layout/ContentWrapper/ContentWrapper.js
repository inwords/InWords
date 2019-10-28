import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  content: {
    paddingTop: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(15)
    }
  }
}));

function ContentWrapper({ authorized, children }) {
  const classes = useStyles();

  return <main className={classes.content}>{children}</main>;
}

ContentWrapper.propTypes = {
  authorized: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default ContentWrapper;
