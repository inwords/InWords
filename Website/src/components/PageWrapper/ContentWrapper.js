import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(11)
  },
  shift: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(17)
    }
  }
}));

function ContentWrapper({ shift, children }) {
  const classes = useStyles();

  return (
    <main className={clsx(classes.root, { [classes.shift]: shift })}>
      {children}
    </main>
  );
}

ContentWrapper.propTypes = {
  shift: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default ContentWrapper;
