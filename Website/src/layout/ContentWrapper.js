import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(11),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(16)
    }
  }
}));

function ContentWrapper({ authorized, children }) {
  const classes = useStyles();

  return <main className={classes.content}>{children}</main>;
}

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default ContentWrapper;
