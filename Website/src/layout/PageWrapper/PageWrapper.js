import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Header from 'src/layout/Header';
import ContentWrapper from 'src/layout/ContentWrapper';
import CustomDrawer from 'src/layout/CustomDrawer';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(11),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(16)
    }
  }
}));

function PageWrapper({ sideRoutes, authorized, children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      {sideRoutes && <CustomDrawer />}
      <ContentWrapper>{children}</ContentWrapper>
    </div>
  );
}

PageWrapper.propTypes = {
  sideRoutes: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ),
  authorized: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default PageWrapper;
