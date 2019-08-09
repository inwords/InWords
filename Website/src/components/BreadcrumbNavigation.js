import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(2)
  }
}));

function BreadcrumbNavigation({ children }) {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.paper}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {children}
      </Breadcrumbs>
    </Paper>
  );
}

BreadcrumbNavigation.propTypes = {
  children: PropTypes.node.isRequired
};

export default BreadcrumbNavigation;
