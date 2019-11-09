import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    display: 'block',
    marginTop: theme.spacing(4),
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}));

function PageProgress() {
  const classes = useStyles();

  return <CircularProgress className={classes.progress} />;
}

export default PageProgress;
