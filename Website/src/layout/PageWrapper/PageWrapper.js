import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import useDrawer from 'src/hooks/useDrawer';
import Header from 'src/layout/Header';
import CustomDrawer from 'src/layout/CustomDrawer';
import ContentWrapper from 'src/layout/ContentWrapper';

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

function PageWrapper({ mainRoutes, sideRoutes, authorized, children }) {
  const classes = useStyles();
  const { open, handleOpen, handleClose } = useDrawer();

  return (
    <div className={classes.root}>
      <Header mainRoutes={mainRoutes} handleOpenDrawer={sideRoutes && handleOpen} />
      {sideRoutes && <CustomDrawer sideRoutes={sideRoutes} />}
      <ContentWrapper>{children}</ContentWrapper>
    </div>
  );
}

PageWrapper.propTypes = {
  mainRoutes: PropTypes.array,
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
