import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(11)
  },
  shifted: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(17)
    }
  }
}));

function ContentWrapper({ shifted, children }) {
  const classes = useStyles();

  return (
    <main className={clsx(classes.root, { [classes.shifted]: shifted })}>
      {children}
    </main>
  );
}

ContentWrapper.propTypes = {
  shifted: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default ContentWrapper;
